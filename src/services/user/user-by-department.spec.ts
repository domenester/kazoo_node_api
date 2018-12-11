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

describe("Testing User By Department Service", async () => {

  let userCreated: any;

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should create a new user", async () => {
    const body: IUserNew = {
      racf: "userbydep",
      department: "department",
      email: "userbydep@mock.com",
      extension: "2222",
      name: "User By Department"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should get the user created by department", async () => {
    const response = await UserByDepartmentService(userCreated.last_name);
    expect(response.status).to.be.equal("success");
    expect(response.data.length).to.be.gte(1);
  });

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });
});
