// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserDelete from "./user-delete";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { IUserNew } from "../../../../interfaces";
import { addUserService } from "./user-new.spec";
import { UserNew } from "../../../../services/user/user-new.service";

export const deleteUserService = async (userId: string) => {
  const env = process.env;
  const userApi = new UserApi(logger);
  const userDelete = new UserDelete(logger, userApi.path);

  let response = await request(
    `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}/${userId}`,
    {
      method: userDelete.method,
      headers: { "Content-Type": "application/json" },
      rejectUnauthorized: false
    },
  ).catch((e) => {
    return JSON.parse(e.error)
  });

  try {
    return JSON.parse(response);
  } catch (err) {
    return response;
  }
}

describe("Testing User Delete", async () => {

  let userIdAdded: string;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create new user to delete it", async () => {

    const body: IUserNew = {
      name: "User Delete",
      racf: "userdel",
      extension: "12345",
      email: "usertodelete@usertodelete.com",
      department: "Valid department"
    };

    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userIdAdded = response.id;
  });

  it("should delete the user created to delete", async () => {
    let response = await deleteUserService(userIdAdded);
    expect(response.data.status).to.be.eq("success");
  });
});
