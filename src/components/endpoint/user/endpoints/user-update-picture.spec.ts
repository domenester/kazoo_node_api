// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages, user } from "../../../error/error-messages";
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
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";

export const updatePictureByEndpoint = async (userId: string) => {
  const userApi = new UserApi(logger);
  const userPicUpload = new UploadProfilePicture(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(userPicUpload.fullPath);
  const file = fs.createReadStream(`${__dirname}/usericon.jpg`);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    formData: {
      id: userId,
      File: file
    },
    method: userPicUpload.method,
    rejectUnauthorized: false,
  };
  const response = await serviceTestApiInstance.request(
    userPicUpload.method, {}, options, "Testing User Picture Update"
  );
  return response;
}

describe("Testing User Picture Update", async () => {

  let userAdded: any;
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user", async () => {

    const body: IUserNew = userMock;

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should update user picture", async () => {
    let response = await updatePictureByEndpoint(userAdded.id);
    expect(response.data).to.be.true;
  }).timeout(4000);
  
  it("should remove user, device and callflow added", async () => {
    await deleteUserByEndpoint(userAdded);
  }).timeout(10000);
});
