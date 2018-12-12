// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserListService } from "./user-list.service";

describe("Testing User List Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should return all users", async () => {
    const response = await UserListService();
    expect(response.data.length).to.be.gte(0);
  }).timeout(5000);
});
