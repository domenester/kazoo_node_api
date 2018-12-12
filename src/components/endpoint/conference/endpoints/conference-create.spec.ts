// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ConferenceCreate from "./conference-create";
import ConferenceApi from "../conference.api";
import responseMessages from "../../../../config/endpoints-response-messages";
import { IUserNew } from "../../../../interfaces";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device/device-delete.service";
import { CallflowDeleteService } from "../../../../services/callflow/callflow-delete.service";
import { addUserService } from "../../user/endpoints/user-new.spec";
import { deleteUserByEndpoint } from "../../user/endpoints/user-delete.spec";

export const addConferenceService = async (id: string, endpoint: string) => {
  const conferenceApi = new ConferenceApi(logger);
  const conferenceCreate = new ConferenceCreate(logger, conferenceApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${conferenceApi.path}/${id}/${endpoint}`,
    {
      method: conferenceCreate.method,
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

describe("Testing Conference Create", async () => {

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
    const body: IUserNew = {
      racf: "createconf",
      department: "department",
      email: "createconf@mock.com",
      extension: "2222",
      name: "Create Conference"
    };
    const response = await addUserService(body).catch(err => err);
    userCreated = response.data;
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
    userInvited = response.data;
  }).timeout(10000);

  it("should create a new conference", async () => {
    const id = userCreated.id;
    const endpoint = userInvited.id;
    const response = await addConferenceService(id, endpoint);
    expect(response.data.status).to.be.equal("success");
    conferenceCreated = response.data.data.endpoint_responses[0];
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
