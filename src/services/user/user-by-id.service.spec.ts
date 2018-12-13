// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserListService } from "./user-list.service";
import { UserByIdService } from "./user-by-id.service";
import { createNewUser } from "./user-new.service.spec";
import { userMock } from "./mocks";

describe("Testing User By Id Service", async () => {

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

  it("should get the user created by id", async () => {
    const response = await UserByIdService(userCreated.id);
    expect(response.status).to.be.equal("success");
    expect(response.data.id).to.be.equal(userCreated.id);
  });
});
