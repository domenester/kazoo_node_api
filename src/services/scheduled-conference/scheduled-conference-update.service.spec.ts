// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { ScheduledConfCreateService } from "./";
import { bodyCreate } from "./mocks";
import { ScheduledConfDeleteService } from "./scheduled-conference-delete.service";
import { ScheduledConfUpdateService, IScheduledConfUpdate } from "./scheduled-conference-update.service";
import moment = require("moment");

describe("Testing Schedule Conference Update Service", async () => {

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
    let response = await ScheduledConfUpdateService(body);
    expect(response.body).to.be.equal(body.body);
    expect(response.subject).to.be.equal(body.subject);
  });

  it("should delete a schedule conference", async () => {
    let response = await ScheduledConfDeleteService(scheduledConferenceCreated.id);
    expect(response).to.be.equal(1);
  });
});
