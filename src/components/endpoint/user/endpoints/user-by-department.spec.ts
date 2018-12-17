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
import UserByDepartment from "./user-by-department";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";

export const getUserByDepartmentService = async (department: string) => {
  const userApi = new UserApi(logger);
  const userByDepartment = new UserByDepartment(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/department/${department}`);
  const response = await serviceTestApiInstance.request(
    userByDepartment.method, {}, {}, "Testing User By Department"
  );
  return response;
}

describe("Testing User By Department", async () => {

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

  it("should return empty array for department that don't exist", async () => {
    const userApi = new UserApi(logger);
    const userByDepartment = new UserByDepartment(logger, userApi.path);
    let response = await getUserByDepartmentService("wrongdepartment");
    expect(response.length).to.be.equal(0);
  }).timeout(4000);

  it("should return the user created by department", async () => {
    const userApi = new UserApi(logger);
    const userByDepartment = new UserByDepartment(logger, userApi.path);
    let response = await getUserByDepartmentService(userAdded.last_name);
    expect(response.length).to.be.gte(1);
  }).timeout(4000);

  it("should remove user, device and callflow added", async () => {
    await deleteUserByEndpoint(userAdded);
  }).timeout(10000);
  
});
