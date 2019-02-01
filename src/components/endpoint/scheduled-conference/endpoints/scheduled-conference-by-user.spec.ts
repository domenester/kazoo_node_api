// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ScheduledConferenceApi from "../scheduled-conference.api";
import ScheduledConfereneByUser from "./scheduled-conference-by-user";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { ScheduledConfCreateService, ScheduledConfDeleteService } from "../../../../services";
import { bodyCreate, scheduledConfByUser } from "../../../../services/scheduled-conference/mocks";
import { addUserService } from "../../user/endpoints/user-new.spec";
import { userMock, userMock2, userMock3 } from "../../../../services/user/mocks";
import { deleteUserService } from "../../user/endpoints/user-delete.spec";

export const scheduleConfByUserByEndpoint = async (username: string) => {
  const scheduledConferenceApi = new ScheduledConferenceApi(logger);
  const scheduledConfereneByUser = new ScheduledConfereneByUser(logger, scheduledConferenceApi.path);
  const serviceTestApiInstance = new ServiceTestApi(
    `${scheduledConferenceApi.path}/${username}`
  );
  const response = await serviceTestApiInstance.request(
    scheduledConfereneByUser.method, {}, {}, "Testing Schedule Conference By User"
  );
  return response;
}

describe("Testing Schedule Conference By User", async () => {

  let scheduledConferenceCreated: any;
  let userModerator: any;
  let userParticipant1: any;
  let userParticipant2: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });
  
  it("should create a user moderator and participants", async () => {
    const users = await Promise.all([
      addUserService(userMock),
      addUserService(userMock2),
      addUserService(userMock3)
    ]).catch(err => err);
    userModerator = users[0];
    userParticipant1 = users[1];
    userParticipant2 = users[2];
  }).timeout(10000);

  it("should create the schedule conference to get it", async () => {
    const body = scheduledConfByUser(
      userModerator.username,
      userParticipant1.username,
      userParticipant2.username
    );
    scheduledConferenceCreated = await ScheduledConfCreateService(body).catch(err => err);
  });

  it("should get schedule conference by user", async () => {
    let response = await scheduleConfByUserByEndpoint(
      scheduledConferenceCreated.moderator
    ).catch(err => err);
    expect(response).to.be.not.null;
  });

  it("should delete user moderator and participants", async () => {
    await Promise.all([
      deleteUserService(userModerator.id),
      deleteUserService(userParticipant1.id),
      deleteUserService(userParticipant2.id)
    ]).catch(err => {
      console.log('err',err)
    });
  }).timeout(10000);
});
