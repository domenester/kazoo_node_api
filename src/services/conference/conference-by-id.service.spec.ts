// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { ConferenceCreateService } from ".";
import { addUserService } from "../../components/endpoint/user/endpoints/user-new.spec";
import { deleteUserByEndpoint } from "../../components/endpoint/user/endpoints/user-delete.spec";
import { ConferenceByIdService } from "./conference-by-id.service";
import { userMock, userMock2 } from "../user/mocks";

describe("Testing Conference By Id Service", async () => {

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

  it("should create a new conference to get it by id", async () => {
    const id = userCreated.id;
    const endpoint = userInvited.id;
    const response = await ConferenceCreateService(endpoint, id);
    expect(response.status).to.be.equal("success");
    conferenceCreated = response.data.endpoint_responses[0];
  });

  it("should get the conference by id", async () => {
    const response = await ConferenceByIdService(conferenceCreated.endpoint_id);
    expect(response.status).to.be.equal("success");
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
