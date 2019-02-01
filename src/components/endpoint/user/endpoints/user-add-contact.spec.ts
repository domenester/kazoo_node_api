// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserAddContact from "./user-add-contact";
import UserApi from "../user.api";
import { IUserNew } from "../../../../interfaces";
import { addUserService } from "./user-new.spec";
import { userMock, userMock2 } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import { deleteUserByEndpoint } from "./user-delete.spec";


export const userAddContactByEndpoint = async (userId: string, body: any) => {
  const userApi = new UserApi(logger);
  const userAddContact = new UserAddContact(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/${userId}`);
  const response = await serviceTestApiInstance.request(
    userAddContact.method, body, {}, "Testing User Add Contact"
  );
  return response;
}

describe("Testing User Add Contact", async () => {

  let userAdded: any;
  let userAdded2: any;
  
  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create new user to add contacts", async () => {
    const body: IUserNew = userMock;
    let response = await addUserService(body).catch(err => err);
    userAdded = response;
    expect(typeof userAdded.callflow === "string").to.be.true;
    expect(userAdded.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should create new user to be added as a contact", async () => {
    const body: IUserNew = userMock2;
    let response = await addUserService(body).catch(err => err);
    userAdded2 = response;
    expect(typeof userAdded2.callflow === "string").to.be.true;
    expect(userAdded2.devices.length).to.be.equal(1);
  }).timeout(10000);

  it("should add the user2 as a contact of the user1", async () => {
    const response = await userAddContactByEndpoint(userAdded.id, userAdded2);
    expect(response.contact_list.contacts[0].id).to.be.equal(userAdded2.id);
  }).timeout(10000);

  it("should remove user1, device and callflow added", async () => {
    const response = await deleteUserByEndpoint(userAdded);
    expect(response).to.be.true;
  }).timeout(10000);

  it("should remove user2, device and callflow added", async () => {
    const response = await deleteUserByEndpoint(userAdded2);
    expect(response).to.be.true;
  }).timeout(10000);
  
});
