// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { CallflowCreateService } from "./callflow-create.service";
import { CallflowDeleteService } from "./callflow-delete.service";

describe("Testing Callflow Delete Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a user to add callflow and delete it", async () => {
    const body: IUserNew = {
      racf: "callflowdelete",
      department: "department",
      email: "callflowdelete@mock.com",
      extension: "2222",
      name: "Callflow Delete"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should create a callflow to the user created", async () => {
    const response = await CallflowCreateService(
      userCreated.id, userCreated.username, "2222"
    );
    expect(response.status).to.be.equal("success");
    callflowCreated = response.data;
  });

  it("should delete the callflow created", async () => {
    const response = await CallflowDeleteService(callflowCreated.id);
    expect(response.status).to.be.equal("success");
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
