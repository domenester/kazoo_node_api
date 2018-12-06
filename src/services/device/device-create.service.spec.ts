// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "../user/user-new.service";
import server from "../../server";
import * as request from "request-promise";
import { NODE_HOST, NODE_PORT } from "../../config/env";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "../user/user-delete.service";
import { DeviceCreateService } from "./device-create.service";
import { DeviceDeleteService } from "./device-delete.service";

describe("Testing Device Create Service", async () => {

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
      racf: "devicecreate",
      department: "department",
      email: "devicecreate@mock.com",
      extension: "2222",
      name: "Device Create"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should create a device to the user created", async () => {
    const response = await DeviceCreateService(
      userCreated.id, userCreated.username
    );
    expect(response.data.owner_id).to.be.equal(userCreated.id);
    deviceCreated = response.data;
  });

  it("should delete the device created", async () => {
    const response = await DeviceDeleteService(deviceCreated.id);
    expect(response.status).to.be.equal("success");
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
