// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserByExtensionService } from "./user-by-extension";
import { userMock } from "./mocks";
import { addUserService } from "../../components/endpoint/user/endpoints/user-new.spec";
import { deleteUserByEndpoint } from "../../components/endpoint/user/endpoints/user-delete.spec";

describe.only("Testing User By Extension Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create a user to get it by extension", async () => {
    const body: IUserNew = userMock;
    userCreated = await addUserService(body);
  }).timeout(10000);

  it("should get nothing for a extension that don't exist", async () => {
    const response = await UserByExtensionService("-1");
    expect(response).to.be.null;
  });

  it("should get the user created by extension", async () => {
    const response = await UserByExtensionService(userMock.extension);
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.equal(1);
  });

  it("should delete the user created", async () => {
    await deleteUserByEndpoint(userCreated);
  }).timeout(10000);
});
