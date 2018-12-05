// // tslint:disable:no-unused-expression

// import { expect } from "chai";
// import "mocha";
// import * as request from "request-promise";
// import { promisify } from "util";
// import {default as logger} from "../../../../components/logger/logger";
// import server from "../../../../server";
// import UserNew from "./user-new";
// import UserDelete from "./user-delete";
// import UserApi from "../user.api";
// import enums from "../enums";
// import { JsonWebTokenError } from "jsonwebtoken";
// import responseMessages from "../../../../config/endpoints-response-messages";
// import { IUserNew } from "../../../../interfaces";
// import { NODE_HOST, NODE_PORT } from "../../../../config/env";
// import { deleteUserService } from "./user-delete.spec";

// export const addUserService = async (body: any) => {
//   const env = process.env;
//   const userApi = new UserApi(logger);
//   const userNew = new UserNew(logger);

//   let response = await request(
//     `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}${userNew.path}`,
//     {
//       method: userNew.method,
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

// describe("Testing User New", async () => {

//   let userIdAdded: string;

//   it("Starting server...", async () => {
//     await server.start();
//   }).timeout(10000);

//   after( async () => {
//     server.stop();
//   });

//   it("should throw error because name is empty", async () => {

//     const body: IUserNew = {
//       name: "",
//       racf: "Valid Racf",
//       extension: "12345",
//       email: "validemail@valid.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should throw error because racf is empty", async () => {

//     const body: IUserNew = {
//       name: "Valid Name",
//       racf: "",
//       extension: "12345",
//       email: "validemail@valid.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should throw error because extension is empty", async () => {

//     const body: IUserNew = {
//       name: "Valid Name",
//       racf: "Valid Racf",
//       extension: "",
//       email: "validemail@valid.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should throw error because email is invalid", async () => {

//     const body: IUserNew = {
//       name: "Valid Name",
//       racf: "Valid Racf",
//       extension: "12345",
//       email: "validemail@valid.",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should throw error because department is empty", async () => {

//     const body: IUserNew = {
//       name: "Valid Name",
//       racf: "Valid Racf",
//       extension: "12345",
//       email: "validemail@valid.com",
//       department: "",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should throw error because perfil value isn't in enum", async () => {

//     const body: IUserNew = {
//       name: "Valid Name",
//       racf: "Valid Racf",
//       extension: "12345",
//       email: "validemail@valid.com",
//       department: "Valid department",
//       profile: "Anyvalue"
//     };

//     let response = await addUserService(body);

//     expect(response.code).to.be.equal(401);
//   });

//   it("should add new user", async () => {

//     const body: IUserNew = {
//       name: "Valid Name",
//       racf: "useradd",
//       extension: "12345",
//       email: "validemail@valid.com",
//       department: "Valid department",
//       profile: "Administrador"
//     };

//     let response = await addUserService(body);
//     userIdAdded = response.data.id;
//     expect(response.data).to.not.be.null;
//     expect(response.message).to.be.equal(responseMessages.userNew);
//   }).timeout(10000);

//   it("should remove user added", async () => {
//     let response = await deleteUserService(userIdAdded);
    
//     expect(response.data).to.be.eq(true);
//   }).timeout(10000);
// });
