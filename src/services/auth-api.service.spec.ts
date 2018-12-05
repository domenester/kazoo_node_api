// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { AuthApiService } from "./auth-api.service";
import server from "../server";
import * as request from "request-promise";
import { NODE_HOST, NODE_PORT } from "../config/env";

describe("Testing API Authentication", async () => {
  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should authenticate the kazoo api", async () => {
    const response = await AuthApiService();
    expect(typeof response === "string").to.be.true;
  });
});
