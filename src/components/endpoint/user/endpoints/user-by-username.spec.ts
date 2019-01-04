import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserApi from "../user.api";
import { IUserNew } from "../../../../interfaces";
import { addUserService } from "./user-new.spec";
import UserByUsername from "./user-by-username";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";

export const getUserByUsernameByEndpoint = async (username: string) => {
  const userApi = new UserApi(logger);
  const userByUsername = new UserByUsername(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/username/${username}`);
  const response = await serviceTestApiInstance.request(
    userByUsername.method, {}, {}, "Testing User By Username"
  );
  return response;
}

describe("Testing User By Username", async () => {

  let userAdded: any;
  
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should add new user to get it by username", async () => {
    const body: IUserNew = userMock;
    let response = await addUserService(body).catch(err => err);
    userAdded = response;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should return empty array for username that don't exist", async () => {
    let response = await getUserByUsernameByEndpoint("anyemail@mock.z");
    expect(response.length).to.be.equal(0);
  }).timeout(4000);

  it("should return the user created by username", async () => {
    let response = await getUserByUsernameByEndpoint(userAdded.username);
    expect(response.length).to.be.gte(1);
  }).timeout(4000);

  it("should remove user, device and callflow added", async () => {
    await deleteUserByEndpoint(userAdded);
  }).timeout(10000);
  
});
