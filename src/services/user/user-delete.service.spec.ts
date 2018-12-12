// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { createNewUser } from "./user-new.service.spec";

describe("Testing User Delete Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "userdelete",
      department: "department",
      email: "userdelete@mock.com",
      extension: "2222",
      name: "User Delete"
    };
    userCreated = await createNewUser(body);
  });

  after( () => {
    server.stop();
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
