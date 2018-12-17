// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { userMock } from "./mocks";

export const createNewUser = async (body: IUserNew) => {
  const response = await UserNew(body);
  return response.data;
}

describe("Testing User Create Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create a new user", async () => {
    const body: IUserNew = userMock;
    const response = await UserNew(body);
    expect(response.data.email).to.be.equal(body.email);
    expect(response.data.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should delete the user", async () => {
    await UserDeleteService(userCreated.data.id).catch(err => err);
  });
}).timeout(5000);
