// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserListService } from "./user-list.service";
import { UserByIdService } from "./user-by-id.service";

describe("Testing User By Id Service", async () => {

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

  it("should get the user created by id", async () => {
    const response = await UserByIdService(userCreated.id);
    expect(response.status).to.be.equal("success");
    expect(response.data.id).to.be.equal(userCreated.id);
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
