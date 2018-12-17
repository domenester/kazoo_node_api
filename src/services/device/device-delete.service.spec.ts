// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { DeviceCreateService } from "./device-create.service";
import { DeviceDeleteService } from "./device-delete.service";
import { createNewUser } from "../user/user-new.service.spec";
import { createNewDevice } from "./device-create.service.spec";
import { userMock } from "../user/mocks";

describe("Testing Device Delete Service", async () => {

  let userCreated: any;
  let deviceCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create user and device", async () => {
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
    deviceCreated = await createNewDevice(userCreated.id, userCreated.username);
  }).timeout(10000);

  it("should delete the device created", async () => {
    const response = await DeviceDeleteService(deviceCreated.id);
    expect(response.status).to.be.equal("success");
    await UserDeleteService(userCreated.id);
  });

});
