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
import { createNewUser } from "./user-new.service.spec";

describe("Testing User By Department Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
    const body: IUserNew = {
      racf: "userbydep",
      department: "department",
      email: "userbydep@mock.com",
      extension: "2222",
      name: "User By Department"
    };
    userCreated = await createNewUser(body);
  });

  after( async () => {
    await UserDeleteService(userCreated.id);
    server.stop();
  });

  it("should get the user created by department", async () => {
    const response = await UserByDepartmentService(userCreated.last_name);
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.gte(1);
  });
});
