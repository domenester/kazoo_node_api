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
import { deleteUserByEndpoint } from "../../components/endpoint/user/endpoints/user-delete.spec";
import { ConferenceActionService } from "./conference-action.service";
import { userMock, userMock2 } from "../user/mocks";

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

    const body: IUserNew = userMock;
    const response = await addUserService(body).catch(err => err);
    userCreated = response;
  }).timeout(10000);

  it("should create a new user to invite to a conf", async () => {
    const body: IUserNew = userMock2;
    const response = await addUserService(body).catch(err => err);
    userInvited = response;
  }).timeout(20000);

  it("should create a new conference", async () => {
    // const id = "anyidforconference";
    const id = userCreated.id;
    // const endpoint = "anyendpointforconference";
    const endpoint = userInvited.id;
    const response = await ConferenceCreateService(endpoint, id);
    console.log('response', response, JSON.stringify(response));
    expect(response.status).to.be.equal("success");
    conferenceCreated = response.data.endpoint_responses[0];
  });

  it("should remove user, device and callflow added", async () => {
    const deleteUserDeviceCallflow = await deleteUserByEndpoint(userCreated);
    expect(deleteUserDeviceCallflow).to.be.true;
  }).timeout(10000);

  it("should remove user, device and callflow added to invite", async () => {
    const deleteUserDeviceCallflow = await deleteUserByEndpoint(userInvited);
    expect(deleteUserDeviceCallflow).to.be.true;
  }).timeout(10000);
});
