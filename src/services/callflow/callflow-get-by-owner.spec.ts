// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import * as request from "request-promise";
import { NODE_HOST, NODE_PORT } from "../../config/env";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { CallflowGetByOwnerService } from "./callflow-get-by-owner";
import { CallflowDeleteService, CallflowCreateService } from ".";

describe("Testing Callflow Get By Owner Service", async () => {

  let userCreated: any;
  let callflowCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a user to get callflows", async () => {
    const body: IUserNew = {
      racf: "callflowgetbyowner",
      department: "department",
      email: "callflowgetbyowner@mock.com",
      extension: "2222",
      name: "Callflow Get By Owner"
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

  it("should get callflow by owner", async () => {
    const response = await CallflowGetByOwnerService( userCreated.username );
    expect(response.length).to.be.equal(1);
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
