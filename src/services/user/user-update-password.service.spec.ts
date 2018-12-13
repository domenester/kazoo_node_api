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
import { createNewUser } from "./user-new.service.spec";
import { userMock } from "./mocks";

describe("Testing User Update Password Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await UserDeleteService(userCreated.id);
    server.stop();
  });

  it("should patch the user's password", async () => {
    const response = await UserUpdatePasswordService(userCreated.id, "anypassword");
    expect(response.status).to.be.equal("success");
  });

});
