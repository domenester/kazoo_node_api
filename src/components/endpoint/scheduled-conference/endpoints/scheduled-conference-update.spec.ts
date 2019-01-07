// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import ScheduledConfereneUpdate from "./scheduled-conference-update";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { ScheduledConfCreateService } from "../../../../services";
import { bodyCreate } from "../../../../services/scheduled-conference/mocks";
import { IScheduledConfUpdate } from "../../../../services/scheduled-conference/scheduled-conference-update.service";
import { scheduleConfDeleteByEndpoint } from "./scheduled-conference-delete.spec";
import moment = require("moment");

export const scheduleConfUpdateByEndpoint = async (conference: IScheduledConfUpdate) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConfereneUpdate = new ScheduledConfereneUpdate(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(
    `${scheduledConferenceApi.path}/${conference.id}`
  );
  const response = await serviceTestApiInstance.request(
    scheduledConfereneUpdate.method, conference, {}, "Testing Schedule Conference Update"
  );
  return response;
}

describe("Testing Schedule Conference Update Endpoint", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
    scheduledConferenceCreated = await ScheduledConfCreateService(bodyCreate).catch(err => err);
  });

  after( async () => {
    server.stop();
  });

  it("should update the schedule conference created", async () => {
    const body: IScheduledConfUpdate = {
      id: scheduledConferenceCreated.id,
      body: "Body Edited",
      subject: "Subject Edited",
      date: moment().toISOString()
    }
    let response = await scheduleConfUpdateByEndpoint(body);
    expect(response.body).to.be.equal(body.body);
    expect(response.subject).to.be.equal(body.subject);
  });

  it("should delete schedule conference by id", async () => {
    let response = await scheduleConfDeleteByEndpoint(
      scheduledConferenceCreated.id
    ).catch(err => err);
    expect(response).to.be.equal(1);
  }).timeout(4000);
});
