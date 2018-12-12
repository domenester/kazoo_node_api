// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserById from "./user-by-id";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { IUserNew } from "../../../../interfaces";
import { UserNew } from "../../../../services/user/user-new.service";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { addUserService } from "./user-new.spec";
import { DeviceDeleteService } from "../../../../services/device/device-delete.service";
import { CallflowDeleteService } from "../../../../services";

describe("Testing User By Id", async () => {

  let userAdded: any;
  
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user to get it by id", async () => {

    const body: IUserNew = {
      name: "User by Id",
      racf: "userbyid",
      extension: "12345",
      email: "userbyid@valid.com",
      department: "department",
    };

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response.data;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should return the user created by id", async () => {
    const userApi = new UserApi(logger);
    const userById = new UserById(logger, userApi.path);

    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}/${userAdded.id}`,
      { method: userById.method },
    );
    response = JSON.parse(response);
    expect(response.data.id).to.be.equal(userAdded.id);
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
