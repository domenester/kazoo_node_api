// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { CallflowByIdService } from "./callflow-by-id.service";
import { IUserNew } from "../../interfaces";
import { UserNew } from "../user/user-new.service";
import { CallflowCreateService, CallflowDeleteService } from ".";
import { UserDeleteService } from "../user/user-delete.service";

describe("Testing Callflow By Id Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a user to add callflow", async () => {
    const body: IUserNew = {
      racf: "callflowbyid",
      department: "department",
      email: "callflowbyid@mock.com",
      extension: "2222",
      name: "Callflow By Id"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should create a callflow to the user created to get it by id", async () => {
    const response = await CallflowCreateService(
      userCreated.id, userCreated.username, "2222"
    );
    expect(response.status).to.be.equal("success");
    callflowCreated = response.data;
  });

  it("should return a callflow by id", async () => {
    const response = await CallflowByIdService(callflowCreated.id);
    expect(response.status).to.be.equal("success");
    expect(response.data.id).to.be.equal(callflowCreated.id);
  }).timeout(5000);

  it("should delete the callflow created", async () => {
    const response = await CallflowDeleteService(callflowCreated.id);
    expect(response.status).to.be.equal("success");
  }).timeout(5000);

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });

});
