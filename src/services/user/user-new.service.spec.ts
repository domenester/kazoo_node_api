// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";

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
    await UserDeleteService(userCreated.id).catch(err => err);
    server.stop();
  });

  it("should create a new user", async () => {
    const body: IUserNew = {
      racf: "usercreate",
      department: "department",
      email: "usercreate@mock.com",
      extension: "2222",
      name: "User Create"
    };
    const response = await UserNew(body);
    expect(response.data.email).to.be.equal(body.email);
    expect(response.data.username).to.be.equal(body.racf);
    userCreated = response.data;
  });
});
