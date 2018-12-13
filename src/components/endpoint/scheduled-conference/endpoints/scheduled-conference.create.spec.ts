// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import ScheduledConferenceCreate from "./scheduled-conference-create";
import { ScheduledConfCreateService } from "../../../../services";
import { bodyCreate } from "../../../../services/scheduled-conference/mocks";

export const scheduleConfCreateByEndpoint = async (body: any) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConferenceCreate = new ScheduledConferenceCreate(logger, scheduledConferenceApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${scheduledConferenceCreate.fullPath}`,
    {
      method: scheduledConferenceCreate.method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      rejectUnauthorized: false
    },
  ).catch(err => JSON.parse(err.error));

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
}

describe("Testing Schedule Conference Create", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new schedule conference", async () => {
    let response = await ScheduledConfCreateService(bodyCreate).catch(err => err);
    expect(response).to.be.not.null;
  });
});
