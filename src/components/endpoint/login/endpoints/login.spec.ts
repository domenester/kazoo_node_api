// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import Login from "./login";
import { userPasswordDefault, usernameDefault } from "../../../../mocks";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import LoginApi from "../login.api";

const requestLoginService = async (body) => {
  const env = process.env;
  const loginApi = new LoginApi(logger);
  const login = new Login(logger, loginApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${login.fullPath}`,
    {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: login.method,
      rejectUnauthorized: false,
    }
  ).catch(err => JSON.parse(err.error));

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
}

describe("Testing Login", async () => {

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should authenticate a valid user", async () => {
    const body = {
        password: userPasswordDefault,
        username: usernameDefault,
    };
    const response = await requestLoginService(body);
    expect(response.data).to.not.be.null;
  });

  it("should throw error for an invalid user", async () => {
    const body = { password: "lorem", username: "ipsum" };
    const response = await requestLoginService(body);
    expect(response.code).to.be.equal(401);
    expect(response.message).to.be.equal(errorMessages.unauthorized);
  });
});
