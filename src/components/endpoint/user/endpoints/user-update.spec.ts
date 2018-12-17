// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserUpdate from "./user-update";
import UserApi from "../user.api";
import responseMessages from "../../../../config/endpoints-response-messages";
import { IUserNew, IUserUpdate } from "../../../../interfaces";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device/device-delete.service";
import { CallflowDeleteService } from "../../../../services/callflow/callflow-delete.service";
import { UserService } from "../../../../services";
import { addUserService } from "./user-new.spec";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";

export const updateUserByEndpoint = async (body: any) => {
  const userApi = new UserApi(logger);
  const userUpdate = new UserUpdate(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userUpdate.fullPath}${body.id}`);
  const response = await serviceTestApiInstance.request(
    userUpdate.method, body, {}, "Testing User Update"
  );
  return response;
}

describe("Testing User Update", async () => {

  let userAdded: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user to update it", async () => {

    const body: IUserNew = userMock;

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should update the user's attributes", async () => {

    const body: IUserUpdate = {
      id: userAdded.id,
      name: "User Update Changed",
      racf: "userchange",
      extension: "9998",
      email: "userupdatechanged@valid.com",
      department: "department changed",
    };

    let response = await updateUserByEndpoint(body);
    const userUpdated = response;
    expect(userUpdated.email).to.be.equal(body.email);
    expect(userUpdated.first_name).to.be.equal(body.name);
    expect(userUpdated.last_name).to.be.equal(body.department);
    expect(userUpdated.extension).to.be.equal(body.extension);
    expect(userUpdated.username).to.be.equal(userAdded.username);
  }).timeout(10000);

  it("should remove user, device and callflow added", async () => {
    await deleteUserByEndpoint(userAdded);
  }).timeout(10000);
});
