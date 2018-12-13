// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { ScheduledConfCreateService } from "./";
import { bodyCreate } from "./mocks";
import { ScheduledConfDeleteService } from "./scheduled-conference-delete.service";

describe("Testing Schedule Conference Create Service", async () => {

  let scheduledConferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    await ScheduledConfDeleteService(scheduledConferenceCreated.id);
    server.stop();
  });

  it("should add new schedule conference", async () => {
    let response = await ScheduledConfCreateService(bodyCreate).catch(err => err);
    expect(typeof response.id === "string").to.be.true;
    scheduledConferenceCreated = response;
  });
});
