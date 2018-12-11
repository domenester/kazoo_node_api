// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import * as request from "request-promise";
import { NODE_HOST, NODE_PORT } from "../../config/env";
import { IUserNew } from "../../interfaces";
import { ConferenceCreateService } from ".";
import { ConferenceDeleteService } from "./conference-delete.service";
import { UserNew } from "../user/user-new.service";
import { UserDeleteService } from "../user/user-delete.service";
import { addUserService } from "../../components/endpoint/user/endpoints/user-new.spec";
import { DeviceDeleteService } from "../device";
import { CallflowDeleteService } from "..";

describe.only("Testing User Create Service", async () => {

  let conferenceCreated: any;
  let userCreated: any;
  let userInvited: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a new user owner of a conference", async () => {

    const body: IUserNew = {
      racf: "createconf",
      department: "department",
      email: "createconf@mock.com",
      extension: "2222",
      name: "Create Conference"
    };

    let response = await addUserService(body).catch(err => err);
    
    userCreated = response.data.data;
    expect(typeof response.data.data.callflow === "string").to.be.true;
    expect(response.data.data.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should create a new user to invite to a conf", async () => {
    const body: IUserNew = {
      racf: "confinvite",
      department: "department",
      email: "confinvite@mock.com",
      extension: "2223",
      name: "Create Conference Invite"
    };

    let response = await addUserService(body).catch(err => err);
    
    userInvited = response.data.data;
    expect(typeof response.data.data.callflow === "string").to.be.true;
    expect(response.data.data.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should create a new conference", async () => {
    // const id = "anyidforconference";
    const id = userCreated.id;
    // const endpoint = "anyendpointforconference";
    const endpoint = userInvited.id;
    const response = await ConferenceCreateService(endpoint, id);
    expect(response).to.be.not.be.null;
    conferenceCreated = response.data;
  });

  it("should delete the conference created", async () => {
    const response = await ConferenceDeleteService(conferenceCreated.id);
    expect(response.status).to.be.equal("success");
  });

  it("should remove user, device and callflow added", async () => {
    const userResponse = await UserDeleteService(userCreated.id);
    expect(userResponse.status).to.be.equal("success");

    const deviceResponse = await DeviceDeleteService(userCreated.devices[0]);
    expect(deviceResponse.status).to.be.equal("success");

    const callflowResponse = await CallflowDeleteService(userCreated.callflow);
    expect(callflowResponse.status).to.be.equal("success");
  }).timeout(10000);

  it("should remove user, device and callflow added to invite", async () => {
    const userResponse = await UserDeleteService(userInvited.id);
    expect(userResponse.status).to.be.equal("success");

    const deviceResponse = await DeviceDeleteService(userInvited.devices[0]);
    expect(deviceResponse.status).to.be.equal("success");

    const callflowResponse = await CallflowDeleteService(userInvited.callflow);
    expect(callflowResponse.status).to.be.equal("success");
  }).timeout(10000);
});
