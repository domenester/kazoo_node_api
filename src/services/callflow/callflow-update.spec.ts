// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { CallflowUpdateService } from "./callflow-update";
import { callflowUpdateNormalized } from "../../normalizer/callflow/callflow-update.normalizer";
import { CallflowCreateService, CallflowDeleteService } from ".";
import { createNewUser } from "../user/user-new.service.spec";
import { createNewCallflow } from "./callflow-create.service.spec";
import { userMock } from "../user/mocks";

describe("Testing Callflow Update Service", async () => {

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
    await Promise.all([
      UserDeleteService(userCreated.id),
      CallflowDeleteService(callflowCreated.id)
    ]).catch(err => err);
    server.stop();
  });

  it("should update callflow's extension", async () => {
    const newExtension = "2223";
    const response = await CallflowUpdateService(
      callflowUpdateNormalized([userCreated.username, "2223"]), callflowCreated.id
    );
    expect(response.status).to.be.equal("success");
    expect(response.data.numbers[1]).to.be.equal(newExtension);
  });

}).timeout(5000);
