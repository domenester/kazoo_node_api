// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import { UserNew } from "./user-new.service";
import server from "../../server";
import { IUserNew } from "../../interfaces";
import { UserDeleteService } from "./user-delete.service";
import { UserListService } from "./user-list.service";
import { UserByIdService } from "./user-by-id.service";
import { UserByDepartmentService } from "./user-by-department";
import { UserByExtensionService } from "./user-by-extension";
import { createNewUser } from "./user-new.service.spec";

describe("Testing User By Extension Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "userbyid",
      department: "department",
      email: "userbyid@mock.com",
      extension: "2222",
      name: "User By Id"
    };
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await UserDeleteService(userCreated.id);
    server.stop();
  });

  it("should get nothing for a extension that don't exist", async () => {
    const response = await UserByExtensionService("-1");
    expect(response).to.be.null;
  });

  it("should get the user created by extension", async () => {
    const response = await UserByExtensionService("1100");
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.equal(1);
  });
});
