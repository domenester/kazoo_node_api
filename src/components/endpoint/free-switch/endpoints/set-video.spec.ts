// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import SetVideo from "./set-video";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import FreeSwitchApi from "../free-switch.api";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const setVideoEndpoint = async () => {
  const freeSwitchApi = new FreeSwitchApi(logger);
  const setVideo = new SetVideo(logger);
  const serviceTestApiInstance = new ServiceTestApi(`${freeSwitchApi.path}/conferenceId/setvideo/memberId`);
  const response = await serviceTestApiInstance.request(
    setVideo.method, {}, {}, "Testing Set Video"
  );
  return response;
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
    expect(response).to.not.be.null;
  });
});
