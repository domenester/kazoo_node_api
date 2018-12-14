// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import ScheduledList from "./scheduled-conference-list";
import { ScheduledConfCreateService } from "../../../../services";
import { bodyCreate } from "../../../../services/scheduled-conference/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const scheduleConfListByEndpoint = async () => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConferenceList = new ScheduledList(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(scheduledConferenceList.fullPath);
  const response = await serviceTestApiInstance.request(
    scheduledConferenceList.method, {}, {}, "Testing Schedule Conference List"
  );
  return response;
}

describe("Testing Schedule Conference List", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should list the schedules conferences", async () => {
    let response = await scheduleConfListByEndpoint().catch(err => err);
    expect(response.length).to.be.gte(0);
  });
});
