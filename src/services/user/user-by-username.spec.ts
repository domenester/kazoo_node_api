// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserListService } from "./user-list.service";
import { UserByIdService } from "./user-by-id.service";
import { UserService } from ".";
import { createNewUser } from "./user-new.service.spec";

describe("Testing User By Username Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "userbyname",
      department: "department",
      email: "userbyname@mock.com",
      extension: "2222",
      name: "User By Username"
    };
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await UserDeleteService(userCreated.id);
    server.stop();
  });

  it("should return nothing for an username that don't exist", async () => {
    const response = await UserService.getByUsername("uJkIkjg");
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.equal(0);
  });

  it("should get the user created by username", async () => {
    const response = await UserService.getByUsername(userCreated.username);
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.equal(1);
  });
});
