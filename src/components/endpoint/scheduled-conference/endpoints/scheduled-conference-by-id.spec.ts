// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import ScheduledConfereneById from "./scheduled-conference-by-id";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { ScheduledConfCreateService, ScheduledConfDeleteService } from "../../../../services";
import { bodyCreate } from "../../../../services/scheduled-conference/mocks";

export const scheduleConfByIdByEndpoint = async (conferenceId: string) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConfereneById = new ScheduledConfereneById(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(
    `${scheduledConferenceApi.path}/conferences/${conferenceId}`
  );
  const response = await serviceTestApiInstance.request(
    scheduledConfereneById.method, {}, {}, "Testing Schedule Conference By Id"
  );
  return response;
}

describe("Testing Schedule Conference By Id", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
    scheduledConferenceCreated = await ScheduledConfCreateService(bodyCreate).catch(err => err);
  });

  after( async () => {
    await ScheduledConfDeleteService(scheduledConferenceCreated.id);
    server.stop();
  });

  it("should get schedule conference by id", async () => {
    let response = await scheduleConfByIdByEndpoint(
      scheduledConferenceCreated.id
    ).catch(err => err);
    expect(response.id).to.be.equal(scheduledConferenceCreated.id);
  });
});
