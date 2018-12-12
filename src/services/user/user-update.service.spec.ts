// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import server from "../../server";
import { IUserNew, IUserUpdate } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserUpdateService } from "./user-update.service";
import { createNewUser } from "./user-new.service.spec";

describe("Testing User Update Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "userupdate",
      department: "department",
      email: "userupdate@mock.com",
      extension: "2222",
      name: "User Update"
    };
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await UserDeleteService(userCreated.id);
    server.stop();
  });

  it("should update the user's name", async () => {
    const body: IUserUpdate = {
      id: userCreated.id,
      name: "User Update Changed"
    };
    const response = await UserUpdateService(body);
    expect(response.data.first_name).to.be.equal(body.name);
  });

  it("should update the user's department", async () => {
    const body: IUserUpdate = {
      id: userCreated.id,
      department: "department changed"
    };
    const response = await UserUpdateService(body);
    expect(response.data.last_name).to.be.equal(body.department);
  });

  it("should update the user's email", async () => {
    const body: IUserUpdate = {
      id: userCreated.id,
      email: "userupdatechanged@mock.com"
    };
    const response = await UserUpdateService(body);
    expect(response.data.email).to.be.equal(body.email);
  });

  it("should update the user's callflow id", async () => {
    const body: IUserUpdate = {
      id: userCreated.id,
      callflow: "newcallflowid"
    };
    const response = await UserUpdateService(body);
    expect(response.data.callflow).to.be.equal(body.callflow);
  });

  it("should update the user's devices id", async () => {
    const body: IUserUpdate = {
      id: userCreated.id,
      devices: ["newdeviceid"]
    };
    const response = await UserUpdateService(body);
    expect(response.data.devices).to.be.deep.equal(body.devices);
  });

  it("shouldn't update the user's username", async () => {
    const body: IUserUpdate = {
      id: userCreated.id,
      racf: "userupdatechanged"
    };
    const response = await UserUpdateService(body);
    expect(response.data.racf).to.be.not.equal(body.racf);
  });
});
