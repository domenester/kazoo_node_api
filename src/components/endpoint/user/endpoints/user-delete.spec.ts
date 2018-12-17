// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserDelete from "./user-delete";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { IUserNew } from "../../../../interfaces";
import { addUserService } from "./user-new.spec";
import { UserNew } from "../../../../services/user/user-new.service";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device";
import { CallflowDeleteService } from "../../../../services";
import { createNewUser } from "../../../../services/user/user-new.service.spec";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const deleteUserService = async (userId: string) => {
  const userApi = new UserApi(logger);
  const userDelete = new UserDelete(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/${userId}`);
  const response = await serviceTestApiInstance.request(
    userDelete.method, {}, {}, "Testing User Delete"
  );
  return response;
}

export const deleteUserByEndpoint = async (userAdded: any) => {
  return new Promise( async (resolve, reject) => {
    await UserDeleteService(userAdded.id).catch(err => reject(err));
    await DeviceDeleteService(userAdded.devices[0]).catch(err => reject(err));
    await CallflowDeleteService(userAdded.callflow).catch(err => reject(err));
    resolve(true);
  });
}

describe("Testing User Delete", async () => {

  let userIdAdded: string;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create a user to delet it", async () => {
    const body: IUserNew = userMock;
    const userCreated = await addUserService(body).catch(err => err);
    userIdAdded = userCreated.id;
  }).timeout(10000);

  it("should delete the user created to delete", async () => {
    let response = await deleteUserService(userIdAdded);
    expect(response.status).to.be.eq("success");
  }).timeout(10000);
});
