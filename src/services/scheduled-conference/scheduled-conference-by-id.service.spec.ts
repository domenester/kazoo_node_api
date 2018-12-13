// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { ScheduledConfCreateService, ScheduledConfByIdService } from "./";
import { bodyCreate } from "./mocks";
import { ScheduledConfDeleteService } from "./scheduled-conference-delete.service";

describe("Testing Schedule Conference By Id Service", async () => {

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
    let response = await ScheduledConfByIdService(
      scheduledConferenceCreated.id
    ).catch(err => err);
    expect(response.id).to.be.equal(scheduledConferenceCreated.id);
  });
});
