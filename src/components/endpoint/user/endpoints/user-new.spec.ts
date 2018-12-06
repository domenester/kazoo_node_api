// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserNew from "./user-new";
import UserApi from "../user.api";
import responseMessages from "../../../../config/endpoints-response-messages";
import { IUserNew } from "../../../../interfaces";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device/device-delete.service";
import { CallflowDeleteService } from "../../../../services/callflow/callflow-delete.service";

export const addUserService = async (body: any) => {
  const userApi = new UserApi(logger);
  const userNew = new UserNew(logger, userApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${userNew.fullPath}`,
    {
      method: userNew.method,
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

describe("Testing User New", async () => {

  let userAdded: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should throw error because name is empty", async () => {

    const body: IUserNew = {
      name: "",
      racf: "Valid Racf",
      extension: "12345",
      email: "validemail@valid.com",
      department: "Valid department"
    };

    let response = await addUserService(body);

    expect(response.code).to.be.equal(400);
  });

  it("should throw error because racf is empty", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "",
      extension: "12345",
      email: "validemail@valid.com",
      department: "Valid department"
    };

    let response = await addUserService(body);

    expect(response.code).to.be.equal(400);
  });

  it("should throw error because extension is empty", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "Valid Racf",
      extension: "",
      email: "validemail@valid.com",
      department: "Valid department"
    };

    let response = await addUserService(body);

    expect(response.code).to.be.equal(400);
  });

  it("should throw error because email is invalid", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "Valid Racf",
      extension: "12345",
      email: "validemail@valid.",
      department: "Valid department"
    };

    let response = await addUserService(body);

    expect(response.code).to.be.equal(400);
  });

  it("should throw error because department is empty", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "Valid Racf",
      extension: "12345",
      email: "validemail@valid.com",
      department: ""
    };

    let response = await addUserService(body);

    expect(response.code).to.be.equal(400);
  });

  it.only("should add new user", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "useradd",
      extension: "12345",
      email: "validemail@valid.com",
      department: "Valid department",
    };

    let response = await addUserService(body);
    
    userAdded = response.data;
    expect(typeof response.data.data.callflow === "string").to.not.be.true;
    expect(response.data.data.devices.length).to.be.equal(1);
    
  }).timeout(10000);

  it.only("should remove user, device and callflow added", async () => {
    const userResponse = await UserDeleteService(userAdded.id);
    expect(userResponse.status).to.be.equal("success");

    const deviceResponse = await DeviceDeleteService(userAdded.devices[0]);
    expect(deviceResponse.status).to.be.equal("success");

    const callflowResponse = await CallflowDeleteService(userAdded.callflow);
    expect(callflowResponse.status).to.be.equal("success");
  });
});
