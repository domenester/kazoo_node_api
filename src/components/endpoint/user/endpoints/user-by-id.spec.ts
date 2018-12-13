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
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";


export const userByIdByEndpoint = async (location: string) => {
  const userApi = new UserApi(logger);
  const userById = new UserById(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/${location}`);
  const response = await serviceTestApiInstance.request(
    userById.method, {}, {}, "Testing User By Id"
  );
  return response;
}

describe("Testing User By Id", async () => {

  let userAdded: any;
  
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user to get it by id", async () => {

    const body: IUserNew = userMock;

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response.data;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should return the user created by id", async () => {
    const response = await userByIdByEndpoint(userAdded.id);
    expect(response.id).to.be.equal(userAdded.id);
  }).timeout(4000);

  it("should remove user, device and callflow added", async () => {
    const response = await deleteUserByEndpoint(userAdded);
    expect(response).to.be.true;
  }).timeout(10000);
  
});
