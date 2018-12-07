// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { AuthApiService } from "./auth-api.service";
import server from "../server";
import * as request from "request-promise";
import { NODE_HOST, NODE_PORT } from "../config/env";
import { LoginService } from ".";
import { UserNew } from "./user/user-new.service";
import { IUserNew } from "../interfaces";
import { defaultPassword } from "../normalizer/user";
import { UserDeleteService } from "./user/user-delete.service";

describe("Testing Login Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a new user to loggin", async () => {
    const body: IUserNew = {
      racf: "userlogin",
      department: "department",
      email: "userlogin@mock.com",
      extension: "2222",
      name: "User Login"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should login successfull with the user created", async () => {
    const body = {
      username: "userlogin",
      password: defaultPassword
    }
    const response = await LoginService(body);
    expect(response.status).to.be.equal("success");
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
