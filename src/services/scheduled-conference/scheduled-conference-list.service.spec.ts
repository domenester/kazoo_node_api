// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { ScheduledConfListService } from "./";

describe("Testing Schedule Conference List Service", async () => {

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should get schedule conference list", async () => {
    let response = await ScheduledConfListService().catch(err => err);
    expect(response.length).to.be.gte(0);
  });
});
