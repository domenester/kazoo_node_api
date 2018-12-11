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

describe("Testing User By Email Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a new user", async () => {
    const body: IUserNew = {
      racf: "userbyid",
      department: "department",
      email: "userbyid@mock.com",
      extension: "2222",
      name: "User By Id"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should get the user created by email", async () => {
    const response = await UserService.getByEmail(userCreated.email);
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.equal(1);
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
