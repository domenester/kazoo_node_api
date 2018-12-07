// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { DeviceCreateService, DeviceDeleteService, DeviceUpdateService } from ".";
import { deviceUpdatePasswordNormalized } from "../../normalizer/device/device-update-password.normalizer";

describe("Testing Device Update Service", async () => {

  let userCreated: any;
  let deviceCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a user to add devices", async () => {
    const body: IUserNew = {
      racf: "deviceupdate",
      department: "department",
      email: "deviceupdate@mock.com",
      extension: "2222",
      name: "Device Update"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should create a device to the user created to set it's password", async () => {
    const response = await DeviceCreateService(
      userCreated.id, userCreated.username
    );
    expect(response.data.owner_id).to.be.equal(userCreated.id);
    deviceCreated = response.data;
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

  it("should delete the device created", async () => {
    const response = await DeviceDeleteService(deviceCreated.id);
    expect(response.status).to.be.equal("success");
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
