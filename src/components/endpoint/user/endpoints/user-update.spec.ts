// // tslint:disable:no-unused-expression

// import { expect } from "chai";
// import "mocha";
// import * as request from "request-promise";
// import { promisify } from "util";
// import {default as logger} from "../../../../components/logger/logger";
// import server from "../../../../server";
// import UserUpdate from "./user-update";
// import UserApi from "../user.api";
// import enums from "../enums";
// import { JsonWebTokenError } from "jsonwebtoken";
// import { NODE_HOST, NODE_PORT } from "../../../../config/env";
// import { IUserNew } from "../../../../interfaces";
// import { addUserService } from "./user-new.spec";
// import { deleteUserService } from "./user-delete.spec";

// const requestService = async (body: any) => {
//   const env = process.env;
//   const userApi = new UserApi(logger);
//   const userUpdate = new UserUpdate(logger);

//   let response = await request(
//     `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}${userUpdate.path}`,
//     {
//       method: userUpdate.method,
//       body: JSON.stringify(body),
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

// describe("Testing User Update", async () => {
  
//   let userIdAdded: string;
  
//   it("Starting server...", async () => {
//     await server.start();
//   }).timeout(10000);

//   after( async () => {
//     server.stop();
//   });

//   it("should create new user to test updates", async () => {

//     const body: IUserNew = {
//       name: "User to Update",
//       racf: "userupdate",
//       extension: "12345",
//       email: "userupdateracf@valid.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);
//     userIdAdded = response.data.id;
//     expect(response.data).to.not.be.null;
//   }).timeout(10000);

//   it("should update an user", async () => {
//     const body = {
//       id: userIdAdded,
//       name: "Valid Name Changed",
//       extension: "12346",
//       email: "validemailchanged@valid.com",
//       department: "Valid department changed",
//       profile: "Administrador"
//     };

//     let response = await requestService(body);

//     expect(response.data.first_name).to.be.eq(body.name);
//     expect(response.data.email).to.be.eq(body.email);
//     expect(response.data.last_name).to.be.eq(body.department);
//   }).timeout(10000);

//   it.skip("should update an user with just some fields", async () => {

//     const body = {
//       id: "e4a45df3222c8117121681c58d1a2e59",
//       name: "Valid Name"
//     };

//     let response = await requestService(body);

//     expect(response.data).to.be.deep.equal('Not implemented yet');
//   });

//   it("should throw error because no user id was passed", async () => {

//     const body = {
//       name: "Valid Name",
//       racf: "Valid Racf",
//       extension: "12345",
//       email: "validemail@valid.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await requestService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should throw error because no user was passed", async () => {

//     const body = {
//       id: userIdAdded
//     };

//     let response = await requestService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should delete the user created to update tests", async () => {
//     let response = await deleteUserService(userIdAdded);
//     expect(response.data).to.be.eq(true);
//   }).timeout(10000);
// });
