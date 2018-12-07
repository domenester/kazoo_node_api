// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import * as request from "request-promise";
import { NODE_HOST, NODE_PORT } from "../../config/env";
import { IUserNew, IUserUpdate } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserUpdateService } from "./user-update.service";
import { UserUpdatePasswordService } from "./user-update-password.service";

describe("Testing User Update Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a new user to update it's password", async () => {
    const body: IUserNew = {
      racf: "updatepassword",
      department: "department",
      email: "updatepassword@mock.com",
      extension: "2222",
      name: "Update Password"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should patch the user's password", async () => {
    const response = await UserUpdatePasswordService(userCreated.id, "anypassword");
    expect(response.status).to.be.equal("success");
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
