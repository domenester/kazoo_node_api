// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import SetVideo from "./set-video";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import FreeSwitchApi from "../free-switch.api";

const setVideoEndpoint = async () => {
  const freeSwitchApi = new FreeSwitchApi(logger);
  const setVideo = new SetVideo(logger);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${freeSwitchApi.path}/conferenceId/setvideo/memberId`,
    {
      headers: { "Content-Type": "application/json" },
      method: setVideo.method,
      rejectUnauthorized: false,
    }
  ).catch(err => err);

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
}

describe("Testing Set Video", async () => {

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should call set video endpoint", async () => {
    const response = await setVideoEndpoint();
    expect(response.data).to.not.be.null;
  });
});
