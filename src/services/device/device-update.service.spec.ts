// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { DeviceCreateService, DeviceDeleteService, DeviceUpdateService } from ".";
import { deviceUpdatePasswordNormalized } from "../../normalizer/device/device-update-password.normalizer";
import { createNewUser } from "../user/user-new.service.spec";
import { createNewDevice } from "./device-create.service.spec";
import { userMock } from "../user/mocks";

describe("Testing Device Update Service", async () => {

  let userCreated: any;
  let deviceCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
    deviceCreated = await createNewDevice(userCreated.id, userCreated.username);
  });

  after( async () => {
    await Promise.all([
      DeviceDeleteService(deviceCreated.id),
      UserDeleteService(userCreated.id)
    ]).catch(err => err)
    server.stop();
  });

  it("should update device's passord", async () => {
    const newPassword = "newpassword";
    const response = await DeviceUpdateService(
      deviceUpdatePasswordNormalized(newPassword), deviceCreated.id
    );
    expect(response.status).to.be.equal("success");
    expect(response.data.sip.password).to.be.equal(newPassword);
  });

  //TODO: To implement more tests

}).timeout(10000);
