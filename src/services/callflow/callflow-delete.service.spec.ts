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
import { createNewCallflow } from "./callflow-create.service.spec";
import { userMock } from "../user/mocks";

describe("Testing Callflow Delete Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
    callflowCreated = await createNewCallflow(
      userCreated.id, userCreated.username, body.extension
    )
  });

  after( async () => {
    await UserDeleteService(userCreated.id).catch(err => err);
    server.stop();
  });

  it("should delete the callflow created", async () => {
    const response = await CallflowDeleteService(callflowCreated.id);
    expect(response.status).to.be.equal("success");
  });
}).timeout(5000);
