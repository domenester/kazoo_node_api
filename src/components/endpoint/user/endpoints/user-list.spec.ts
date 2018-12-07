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

describe("Testing User List", async () => {

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should return all users", async () => {
    const env = process.env;
    const userApi = new UserApi(logger);
    const userList = new UserList(logger, userApi.path);

    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${userList.fullPath}`,
      { method: userList.method },
    );
    response = JSON.parse(response);
    expect(response.data.length).to.be.gte(0);
  }).timeout(4000);
});
