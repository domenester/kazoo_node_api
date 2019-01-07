// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import ScheduledConfereneDelete from "./scheduled-conference-delete";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { ScheduledConfCreateService, ScheduledConfDeleteService } from "../../../../services";
import { bodyCreate } from "../../../../services/scheduled-conference/mocks";

export const scheduleConfDeleteByEndpoint = async (conferenceId: string) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConfereneDelete = new ScheduledConfereneDelete(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(
    `${scheduledConferenceApi.path}/${conferenceId}`
  );
  const response = await serviceTestApiInstance.request(
    scheduledConfereneDelete.method, {}, {}, "Testing Schedule Conference Delete"
  );
  return response;
}

describe("Testing Schedule Conference Delete", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
    scheduledConferenceCreated = await ScheduledConfCreateService(bodyCreate).catch(err => err);
  });

  after( async () => {
    server.stop();
  });

  it("should delete schedule conference by id", async () => {
    let response = await scheduleConfDeleteByEndpoint(
      scheduledConferenceCreated.id
    ).catch(err => err);
    expect(response).to.be.equal(1);
  }).timeout(4000);
});
