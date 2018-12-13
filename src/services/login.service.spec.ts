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
import { createNewUser } from "./user/user-new.service.spec";
import { userMock } from "./user/mocks";

describe("Testing Login Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a new user to loggin", async () => {
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
  });

  it("should login successfull with the user created", async () => {
    const body = {
      username: userMock.racf,
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
