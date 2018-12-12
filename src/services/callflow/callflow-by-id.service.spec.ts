// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { CallflowByIdService } from "./callflow-by-id.service";
import { IUserNew } from "../../interfaces";
import { UserNew } from "../user/user-new.service";
import { CallflowCreateService, CallflowDeleteService } from ".";
import { UserDeleteService } from "../user/user-delete.service";
import { createNewUser } from "../user/user-new.service.spec";
import { createNewCallflow } from "./callflow-create.service.spec";

describe("Testing Callflow By Id Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "callflowbyid",
      department: "department",
      email: "callflowbyid@mock.com",
      extension: "2222",
      name: "Callflow By Id"
    };
    userCreated = await createNewUser(body);
    callflowCreated = await createNewCallflow(
      userCreated.id, userCreated.username, body.extension
    )
  });

  after( async () => {
    await Promise.all([
      UserDeleteService(userCreated.id),
      CallflowDeleteService(callflowCreated.id)
    ]).catch(err => err);
    server.stop();
  });

  it("should return a callflow by id", async () => {
    const response = await CallflowByIdService(callflowCreated.id);
    expect(response.status).to.be.equal("success");
    expect(response.data.id).to.be.equal(callflowCreated.id);
  }).timeout(5000);

}).timeout(5000);
