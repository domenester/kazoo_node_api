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

describe("Testing Device Delete Service", async () => {

  let userCreated: any;
  let deviceCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "devicedelete",
      department: "department",
      email: "devicedelete@mock.com",
      extension: "2222",
      name: "Device Delete"
    };
    userCreated = await createNewUser(body);
    deviceCreated = await createNewDevice(userCreated.id, userCreated.username);
  });

  after( async () => {
    await UserDeleteService(userCreated.id);
    server.stop();
  });

  it("should delete the device created", async () => {
    const response = await DeviceDeleteService(deviceCreated.id);
    expect(response.status).to.be.equal("success");
  });

}).timeout(5000);
