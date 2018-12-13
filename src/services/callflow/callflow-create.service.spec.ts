// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { CallflowCreateService } from "./callflow-create.service";
import { CallflowDeleteService } from "./callflow-delete.service";
import { createNewUser } from "../user/user-new.service.spec";
import { userMock } from "../user/mocks";

export const createNewCallflow = async (
  userId: string, username: string, extension: string
) => {
  const response = await CallflowCreateService(userId, username, extension);
  return response.data;
}

describe("Testing Callflow Create Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await Promise.all([
      UserDeleteService(userCreated.id),
      CallflowDeleteService(callflowCreated.id)
    ]).catch(err => err);
    server.stop();
  });

  it("should create a callflow to the user created", async () => {
    const response = await CallflowCreateService(
      userCreated.id, userCreated.username, "2222"
    );
    expect(response.status).to.be.equal("success");
    callflowCreated = response.data;
  });
}).timeout(5000);
