// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import server from "./server";
import { PROTOCOL, NODE_HOST, NODE_PORT } from "./config/env";
import { ServiceTestApi } from "./services/service-test.api";
import HomeApi from "./components/endpoint/home/home.api";
import logger from "./components/logger/logger";
import Home from "./components/endpoint/home/endpoints/home";

export const homeByEndpoint = async () => {
  const homeApi = new HomeApi(logger);
  const home = new Home(logger);
  const serviceTestApiInstance = new ServiceTestApi(`/`);
  const response = await serviceTestApiInstance.request(
    home.method, {}, {}, "Testing Home"
  );
  return response;
}

describe("Testing Server", () => {

  it("should start server", async () => {
    await server.start();
  }).timeout(10000);

  it("should request '/' and return any body", async () => {
    const env = process.env;

    if (!NODE_HOST()) { throw new Error("NODE_HOST env not defined"); }
    if (!NODE_PORT()) { throw new Error("NODE_PORT env not defined"); }

    const body = await homeByEndpoint();
    expect(body).to.not.be.null;
  });

  it("should stop server", () => {
    server.stop();
  });

});
