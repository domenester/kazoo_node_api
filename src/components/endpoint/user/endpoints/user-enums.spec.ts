// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserEnums from "./user-enums";
import UserApi from "../user.api";
import enums from "../enums";
import { NODE_HOST, NODE_PORT, PROTOCOL } from "../../../../config/env";

describe("Testing Users Enums", async () => {

  it("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should return user enums", async () => {
    const userApi = new UserApi(logger);
    const userEnums = new UserEnums(logger, userApi.path);
    const url = `${PROTOCOL()}${NODE_HOST()}:${NODE_PORT()}${userEnums.fullPath}`;
    let response = await request( url,
      {
        method: userEnums.method
      },
    );
    response = JSON.parse(response);
    expect(response.data).to.be.deep.equal(enums);
  });
});
