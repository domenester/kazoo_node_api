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
import { ServiceTestApi } from "../../../../services/service-test.api";

export const userEnumsByEndpoint = async () => {
  const userApi = new UserApi(logger);
  const userEnums = new UserEnums(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(userEnums.fullPath);
  const response = await serviceTestApiInstance.request(
    userEnums.method, {}, {}, "Testing User Enums"
  );
  return response;
}

describe("Testing Users Enums", async () => {

  it("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should return user enums", async () => {
    const response = await userEnumsByEndpoint();
    expect(response.data).to.be.deep.equal(enums);
  });
});
