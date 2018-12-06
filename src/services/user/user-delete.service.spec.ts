// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";

describe("Testing User Delete Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a user to delete", async () => {
    const body: IUserNew = {
      racf: "userdelete",
      department: "department",
      email: "userdelete@mock.com",
      extension: "2222",
      name: "User Delete"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
