// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ConferenceApi from "../conference.api";
import responseMessages from "../../../../config/endpoints-response-messages";
import { IUserNew } from "../../../../interfaces";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device/device-delete.service";
import { CallflowDeleteService } from "../../../../services/callflow/callflow-delete.service";
import { addUserService } from "../../user/endpoints/user-new.spec";
import { deleteUserByEndpoint } from "../../user/endpoints/user-delete.spec";
import ConferenceParticiantAction from "./conference-action-participant";
import { addConferenceByEndpoint } from "./conference-create.spec";
import { userMock, userMock2 } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const addConferenceActionParticipantByEndpoint = async (id: string, participantId: string, action: string) => {
  const conferenceApi = new ConferenceApi(logger);
  const conferenceAction = new ConferenceParticiantAction(logger, conferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${conferenceApi.path}/${id}/${participantId}/${action}`);
  const response = await serviceTestApiInstance.request(
    conferenceAction.method, {}, {}, "Testing Conference Action"
  );
  return response;
}

describe("Testing Conference Action Participant", async () => {

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
    userCreated = response;
  }).timeout(10000);

  it("should create a new user to invite to a conf", async () => {
    const body: IUserNew = userMock2;
    const response = await addUserService(body).catch(err => err);
    userInvited = response;
  }).timeout(10000);

  it("should create a new conference", async () => {
    const id = userCreated.id;
    const endpoint = userInvited.id;
    const response = await addConferenceByEndpoint(id, endpoint);
    expect(response.status).to.be.equal("success");
    conferenceCreated = response.data.endpoint_responses[0];
  });

  it("should create a new conference action for a participant", async () => {
    const response = await addConferenceActionParticipantByEndpoint(
      conferenceCreated.endpoint_id, userInvited.id, "mute"
    );
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
