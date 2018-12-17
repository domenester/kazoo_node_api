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
import { serviceTestApi, ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";

export const createNewUserByEndpoint = async (body: IUserNew) => {
  let response = await addUserService(body).catch(err => err);
  return response;
}

export const addUserService = async (body: any) => {
  const userApi = new UserApi(logger);
  const userNew = new UserNew(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(userNew.fullPath);
  const response = await serviceTestApiInstance.request(
    userNew.method, body, {}, "Testing User New"
  );
  return response;
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

  it("should add new user", async () => {

    const body: IUserNew = {
      name: "Valid Name",
      racf: "useradd",
      extension: "12345",
      email: "validemail@valid.com",
      department: "Valid department",
    };

    let response = await addUserService(body).catch(err => err);
    
    userAdded = response;
    expect(typeof response.callflow === "string").to.be.true;
    expect(response.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should remove user, device and callflow added", async () => {
    const userResponse = await deleteUserByEndpoint(userAdded).catch(err => err)
  }).timeout(10000);
});
