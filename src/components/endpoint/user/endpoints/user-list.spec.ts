// // tslint:disable:no-unused-expression

// import { expect } from "chai";
// import "mocha";
// import * as request from "request-promise";
// import { promisify } from "util";
// import {default as logger} from "../../../../components/logger/logger";
// import server from "../../../../server";
// import { login as errorMessages } from "../../../error/error-messages";
// import { IRequest } from "../../endpoint.interface";
// import UserList from "./user-list";
// import UserApi from "../user.api";
// import { NODE_HOST, NODE_PORT } from "../../../../config/env";

// describe("Testing Users", async () => {

//   it("Starting server...", async () => {
//     await server.start();
//   }).timeout(10000);

//   after( async () => {
//     server.stop();
//   });

//   it("should return all users", async () => {
//     const env = process.env;
//     const userApi = new UserApi(logger);
//     const userList = new UserList(logger);

//     let response = await request(
//       `http://${NODE_HOST()}:${NODE_PORT()}${userApi.path}${userList.path}`,
//       {
//         method: userList.method
//       },
//     );
//     response = JSON.parse(response);
//     expect(response.data).to.be.not.null;
//   }).timeout(4000);
// });
