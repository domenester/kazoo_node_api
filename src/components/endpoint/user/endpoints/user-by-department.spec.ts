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
    
    userAdded = response.data;
    expect(typeof response.data.callflow === "string").to.be.true;
    expect(response.data.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should return empty array for department that don't exist", async () => {
    const userApi = new UserApi(logger);
    const userByDepartment = new UserByDepartment(logger, userApi.path);

    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}/department/wrongdepartment`,
      { method: userByDepartment.method },
    );
    response = JSON.parse(response);
    expect(response.data.length).to.be.equal(0);
  }).timeout(4000);

  it("should return the user created by department", async () => {
    const userApi = new UserApi(logger);
    const userByDepartment = new UserByDepartment(logger, userApi.path);

    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}/department/${userAdded.last_name}`,
      { method: userByDepartment.method },
    );
    response = JSON.parse(response);
    expect(response.data.length).to.be.gte(1);
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
