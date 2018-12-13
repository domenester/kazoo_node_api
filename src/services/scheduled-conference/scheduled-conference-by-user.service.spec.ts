// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { ScheduledConfCreateService, ScheduledConfByIdService, ScheduledConfByUserService } from "./";
import { bodyCreate } from "./mocks";
import { ScheduledConfDeleteService } from "./scheduled-conference-delete.service";

describe("Testing Schedule Conference By User Service", async () => {

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
    let response = await ScheduledConfByUserService(
      scheduledConferenceCreated.moderator
    ).catch(err => err);
    expect(response).to.be.not.null;
  });
});
