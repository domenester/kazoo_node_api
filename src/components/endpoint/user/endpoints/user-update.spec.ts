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

export const updateUserService = async (body: IUserUpdate) => {
  const userApi = new UserApi(logger);
  const userUpdate = new UserUpdate(logger, userApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${userUpdate.fullPath}${body.id}`,
    {
      method: userUpdate.method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      rejectUnauthorized: false
    },
  ).catch(err => JSON.parse(err.error));

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
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

    const body: IUserNew = {
      name: "Valid Name",
      racf: "useradd",
      extension: "12345",
      email: "validemail@valid.com",
      department: "Valid department",
    };

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response.data.data;
    expect(typeof response.data.data.callflow === "string").to.be.true;
    expect(response.data.data.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should update the user's attributes", async () => {

    const body: IUserUpdate = {
      id: userAdded.id,
      name: "User Update Changed",
      racf: "userchange",
      extension: "2222",
      email: "userupdatechanged@valid.com",
      department: "department changed",
    };

    let response = await updateUserService(body);
    const userUpdated = response.data.data;
    expect(userUpdated.email).to.be.equal(body.email);
    expect(userUpdated.first_name).to.be.equal(body.name);
    expect(userUpdated.last_name).to.be.equal(body.department);
    expect(userUpdated.extension).to.be.equal(body.extension);
    expect(userUpdated.username).to.be.equal(userAdded.username);
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
