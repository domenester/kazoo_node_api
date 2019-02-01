// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { IUserNew } from "../../../../interfaces";
import { UserNew } from "../../../../services/user/user-new.service";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { addUserService } from "./user-new.spec";
import { DeviceDeleteService } from "../../../../services/device/device-delete.service";
import { CallflowDeleteService } from "../../../../services";
import UserByExtension from "./user-by-extension";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const getUserByExtensionService = async (extension: string) => {
  const userApi = new UserApi(logger);
  const userByExtension = new UserByExtension(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/extension/${extension}`);
  const response = await serviceTestApiInstance.request(
    userByExtension.method, {}, {}, "Testing User By Extension"
  );
  return response;
}

describe("Testing User By Extension", async () => {

  let userAdded: any;
  
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user to get it by department", async () => {

    const body: IUserNew = userMock;

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should return empty object for extension that don't exist", async () => {
    const response = await getUserByExtensionService("-123");
    expect(response).to.be.deep.equal({});
  }).timeout(4000);

  it("should return the user created by extension", async () => {
    const response = await getUserByExtensionService(userMock.extension);
    expect(response.id).to.be.equal(userAdded.id);
  }).timeout(10000);

  it("should remove user, device and callflow added", async () => {
    const userResponse = await UserDeleteService(userAdded.id);
    expect(userResponse.status).to.be.equal("success");

    const deviceResponse = await DeviceDeleteService(userAdded.devices[0]);
    expect(deviceResponse.status).to.be.equal("success");

    const callflowResponse = await CallflowDeleteService(userAdded.callflow);
    expect(callflowResponse.status).to.be.equal("success");
  }).timeout(10000);
  
});
