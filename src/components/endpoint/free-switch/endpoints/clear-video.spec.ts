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

const clearVideoEndpoint = async () => {
  const freeSwitchApi = new FreeSwitchApi(logger);
  const clearVideo = new ClearVideo(logger);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${freeSwitchApi.path}/conferenceId/clearvideo`,
    {
      headers: { "Content-Type": "application/json" },
      method: clearVideo.method,
      rejectUnauthorized: false,
    }
  ).catch(err => err);

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
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
    expect(response.data).to.not.be.null;
  });
});
