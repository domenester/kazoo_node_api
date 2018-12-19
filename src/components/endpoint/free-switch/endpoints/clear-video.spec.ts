// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ClearVideo from "./clear-video";
import { userPasswordDefault, usernameDefault } from "../../../../mocks";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import FreeSwitchApi from "../free-switch.api";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const clearVideoEndpoint = async () => {
  const freeSwitchApi = new FreeSwitchApi(logger);
  const clearVideo = new ClearVideo(logger, freeSwitchApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${freeSwitchApi.path}/conferenceId/clearvideo`);
  const response = await serviceTestApiInstance.request(
    clearVideo.method, {}, {}, "Testing Clear Video"
  );
  return response;
}

describe("Testing Clear Video", async () => {

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should call clear video endpoint", async () => {
    const response = await clearVideoEndpoint();
    expect(response).to.not.be.null;
  });
});
