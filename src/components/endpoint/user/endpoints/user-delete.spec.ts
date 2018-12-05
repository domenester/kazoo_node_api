// // tslint:disable:no-unused-expression

// import { expect } from "chai";
// import "mocha";
// import * as request from "request-promise";
// import { promisify } from "util";
// import {default as logger} from "../../../../components/logger/logger";
// import server from "../../../../server";
// import UserDelete from "./user-delete";
// import UserApi from "../user.api";
// import enums from "../enums";
// import { JsonWebTokenError } from "jsonwebtoken";
// import { NODE_HOST, NODE_PORT } from "../../../../config/env";
// import { IUserNew } from "../../../../interfaces";
// import { addUserService } from "./user-new.spec";

// export const deleteUserService = async (userId: string) => {
//   const env = process.env;
//   const userApi = new UserApi(logger);
//   const userDelete = new UserDelete(logger);

//   let response = await request(
//     `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}${userDelete.path}?userId=${userId}`,
//     {
//       method: userDelete.method,
//       headers: { "Content-Type": "application/json" },
//       rejectUnauthorized: false
//     },
//   ).catch((e) => JSON.parse(e.error));

//   if ( response instanceof Error ) return response;

//   let responseParsed: any;
//   try {
//     responseParsed = JSON.parse(response);
//   } catch (err) { responseParsed = response; }
//   return responseParsed;
// }

// describe("Testing User Delete", async () => {

//   let userIdAdded: string;

//   it("Starting server...", async () => {
//     await server.start();
//   }).timeout(10000);

//   after( async () => {
//     server.stop();
//   });

//   it("should create new user to delete it", async () => {

//     const body: IUserNew = {
//       name: "User Delete",
//       racf: "userdel",
//       extension: "12345",
//       email: "usertodelete@usertodelete.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);
//     userIdAdded = response.data.id;
//     expect(response.data).to.not.be.null;
//   }).timeout(10000);

//   it("should delete the user created to delete", async () => {

//     let response = await deleteUserService(userIdAdded);

//     expect(response.data).to.be.eq(true);
//   }).timeout(10000);
// });
