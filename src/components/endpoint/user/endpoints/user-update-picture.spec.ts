// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import { IRequest } from "../../endpoint.interface";
import UploadProfilePicture from "./user-update-picture";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { IUserNew } from "../../../../interfaces";
import { addUserService } from "./user-new.spec";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device";
import { CallflowDeleteService } from "../../../../services";
import * as fs from "fs";

describe("Testing User Picture Update", async () => {

  let userAdded: any;
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "useradd",
      extension: "12345",
      email: "validemail@valid.com",
      department: "Valid department",
    };

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response.data;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should update user picture", async () => {
    const env = process.env;
    const userApi = new UserApi(logger);
    const userPicUpload = new UploadProfilePicture(logger, userApi.path);
    const file = fs.createReadStream(`${__dirname}/usericon.jpg`);
    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${userPicUpload.fullPath}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        formData: {
          id: userAdded.id,
          File: file
        },
        method: userPicUpload.method,
        rejectUnauthorized: false,
      }
    );
    response = JSON.parse(response);
    expect(response.data).to.be.true;
  }).timeout(4000);
  
  it("should remove user, device and callflow added", async () => {
    const userResponse = await UserDeleteService(userAdded.id);
    expect(userResponse.status).to.be.equal("success");

    const deviceResponse = await DeviceDeleteService(userAdded.devices[0]);
    expect(deviceResponse.status).to.be.equal("success");

    const callflowResponse = await CallflowDeleteService(userAdded.callflow);
    expect(callflowResponse.status).to.be.equal("success");
  }).timeout(10000);
});
