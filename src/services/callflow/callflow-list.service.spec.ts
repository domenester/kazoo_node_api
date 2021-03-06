// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { CallflowListService } from "./callflow-list.service";

describe("Testing Callflow List Service", async () => {

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should return all callflows", async () => {
    const response = await CallflowListService();
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.gte(0);
  });
});
