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
import { ServiceTestApi } from "../../../../services/service-test.api";

export const scheduleConfCreateByEndpoint = async (body: any) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConferenceCreate = new ScheduledConferenceCreate(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(scheduledConferenceCreate.fullPath);
  const response = await serviceTestApiInstance.request(
    scheduledConferenceCreate.method, body, {}, "Testing Schedule Conference Create"
  );
  return response;
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
    let response = await scheduleConfCreateByEndpoint(bodyCreate).catch(err => err);
    expect(response.moderator).to.be.equal(bodyCreate.moderator);
  });
});
