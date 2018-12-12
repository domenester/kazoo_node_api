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
import { deleteUserDevicesCallflows } from "../../components/endpoint/user/endpoints/user-delete.spec";
import { ConferenceActionService } from "./conference-action.service";

describe("Testing Conference Create Service", async () => {

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
    expect(response.status).to.be.equal("success");
    conferenceCreated = response.data.endpoint_responses[0];
  });

  it("should throw trying to make an invalid action", async () => {
    const response = await ConferenceActionService(
      conferenceCreated.endpoint_id, "invalidaction"
    );
    expect(response.code).to.be.equal(404);
  });

  it("should create a new conference action", async () => {
    const response = await ConferenceActionService(
      conferenceCreated.endpoint_id, "mute"
    );
    expect(response.status).to.be.equal("success");
  });

  it("should remove user, device and callflow added", async () => {
    const deleteUserDeviceCallflow = await deleteUserDevicesCallflows(userCreated);
    expect(deleteUserDeviceCallflow).to.be.true;
  }).timeout(10000);

  it("should remove user, device and callflow added to invite", async () => {
    const deleteUserDeviceCallflow = await deleteUserDevicesCallflows(userInvited);
    expect(deleteUserDeviceCallflow).to.be.true;
  }).timeout(10000);
});
