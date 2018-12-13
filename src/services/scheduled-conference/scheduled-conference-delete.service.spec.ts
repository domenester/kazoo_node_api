// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { ScheduledConfCreateService } from "./";
import { bodyCreate } from "./mocks";
import { ScheduledConfDeleteService } from "./scheduled-conference-delete.service";

describe("Testing Schedule Conference Delete Service", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
    scheduledConferenceCreated = await ScheduledConfCreateService(bodyCreate).catch(err => err);
  });

  after( async () => {
    server.stop();
  });

  it("should delete a schedule conference", async () => {
    let response = await ScheduledConfDeleteService(scheduledConferenceCreated.id);
    expect(response).to.be.equal(1);
  });
});
