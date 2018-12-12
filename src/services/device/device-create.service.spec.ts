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

export const createNewDevice = async (userId: string, username: string) => {
  const response = await DeviceCreateService( userId, username );
  return response.data;
}

describe("Testing Device Create Service", async () => {

  let userCreated: any;
  let deviceCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "devicecreate",
      department: "department",
      email: "devicecreate@mock.com",
      extension: "2222",
      name: "Device Create"
    };
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await Promise.all([
      DeviceDeleteService(deviceCreated.id),
      UserDeleteService(userCreated.id)
    ]).catch(err => err);
    server.stop();
  });

  it("should create a device to the user created", async () => {
    const response = await DeviceCreateService(
      userCreated.id, userCreated.username
    );
    expect(response.data.owner_id).to.be.equal(userCreated.id);
    deviceCreated = response.data;
  });
});
