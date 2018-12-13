// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ConferenceApi from "../conference.api";
import { IUserNew } from "../../../../interfaces";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { addUserService } from "../../user/endpoints/user-new.spec";
import { deleteUserByEndpoint } from "../../user/endpoints/user-delete.spec";
import ConferenceAction from "./conference-action";
import { addConferenceService } from "./conference-create.spec";
import ConferenceById from "./conference-by-id";
import { userMock, userMock2 } from "../../../../services/user/mocks";

export const conferenceByIdEndpoint = async (id: string) => {
  const conferenceApi = new ConferenceApi(logger);
  const conferenceById = new ConferenceById(logger, conferenceApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${conferenceApi.path}/${id}`,
    {
      method: conferenceById.method,
      headers: { "Content-Type": "application/json" },
      rejectUnauthorized: false
    },
  ).catch(err => err);

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
}

describe("Testing Conference By Id", async () => {

  let userCreated: any;
  let userInvited: any;
  let conferenceCreated: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create a new user owner of a conference", async () => {
    const body: IUserNew = userMock;
    const response = await addUserService(body).catch(err => err);
    userCreated = response.data;
  }).timeout(10000);

  it("should create a new user to invite to a conf", async () => {
    const body: IUserNew = userMock2;
    const response = await addUserService(body).catch(err => err);
    userInvited = response.data;
  }).timeout(10000);

  it("should create a new conference to get it by id", async () => {
    const id = userCreated.id;
    const endpoint = userInvited.id;
    const response = await addConferenceService(id, endpoint);
    expect(response.data.status).to.be.equal("success");
    conferenceCreated = response.data.data.endpoint_responses[0];
  });

  it("should get the conference by id", async () => {
    const response = await conferenceByIdEndpoint(conferenceCreated.endpoint_id);
    expect(response.data.status).to.be.equal("success");
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
