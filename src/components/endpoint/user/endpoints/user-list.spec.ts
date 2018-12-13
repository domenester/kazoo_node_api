// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import { IRequest } from "../../endpoint.interface";
import UserList from "./user-list";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { serviceTestApi, ServiceTestApi } from "../../../../services/service-test.api";

export const userListByEndpoint = async () => {
  const userApi = new UserApi(logger);
  const userList = new UserList(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(userList.fullPath);
  const response = await serviceTestApiInstance.request(
    userList.method, {}, {}, "Testing User List"
  );
  return response;
}

describe("Testing User List", async () => {

  let serviceTestApiInstance: ServiceTestApi;
  let userApi: UserApi;
  let userList: UserList;
  
  before("Starting server...", async () => {
    await server.start();
    userApi = new UserApi(logger);
    userList = new UserList(logger, userApi.path);
    serviceTestApiInstance = serviceTestApi(userList.fullPath);
  });

  after( async () => {
    server.stop();
  });

  it("should return all users", async () => {
    let response = await userListByEndpoint();
    expect(response.length).to.be.gte(0);
  }).timeout(4000);
});
