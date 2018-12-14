// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import ScheduledConfereneByUser from "./scheduled-conference-by-user";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { ScheduledConfCreateService, ScheduledConfDeleteService } from "../../../../services";
import { bodyCreate } from "../../../../services/scheduled-conference/mocks";

export const scheduleConfByUserByEndpoint = async (userId: string) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConfereneByUser = new ScheduledConfereneByUser(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(
    `${scheduledConferenceApi.path}/conferences?userId=${userId}`
  );
  const response = await serviceTestApiInstance.request(
    scheduledConfereneByUser.method, {}, {}, "Testing Schedule Conference By User"
  );
  return response;
}

describe("Testing Schedule Conference By User", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
    scheduledConferenceCreated = await ScheduledConfCreateService(bodyCreate).catch(err => err);
  });

  after( async () => {
    await ScheduledConfDeleteService(scheduledConferenceCreated.id);
    server.stop();
  });

  it("should get schedule conference by user", async () => {
    let response = await scheduleConfByUserByEndpoint(
      scheduledConferenceCreated.moderator
    ).catch(err => err);
    expect(response).to.be.not.null;
  });
});
