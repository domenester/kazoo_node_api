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
import { DeviceGetByOwnerService } from "./device-get-by-owner.service";
import { createNewUser } from "../user/user-new.service.spec";
import { createNewDevice } from "./device-create.service.spec";
import { userMock } from "../user/mocks";

describe("Testing Device Get By Owner Service", async () => {

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

  it("should get device by owner", async () => {
    const response = await DeviceGetByOwnerService( userCreated.id );
    expect(response.data[0].owner_id).to.be.equal(userCreated.id);
  });
}).timeout(10000);
