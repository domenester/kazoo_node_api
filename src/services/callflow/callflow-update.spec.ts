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

describe("Testing Callflow Update Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a user to update it's callflow", async () => {
    const body: IUserNew = {
      racf: "callflowupdate",
      department: "department",
      email: "callflowupdate@mock.com",
      extension: "2222",
      name: "Callflow Update"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should create a callflow for user created", async () => {
    const response = await CallflowCreateService(
      userCreated.id, userCreated.username, "2222"
    );
    expect(response.data.numbers[0]).to.be.equal(userCreated.username);
    callflowCreated = response.data;
  });

  it("should update callflow's extension", async () => {
    const newExtension = "2223";
    const response = await CallflowUpdateService(
      callflowUpdateNormalized([userCreated.username, "2223"]), callflowCreated.id
    );
    expect(response.status).to.be.equal("success");
    expect(response.data.numbers[1]).to.be.equal(newExtension);
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
