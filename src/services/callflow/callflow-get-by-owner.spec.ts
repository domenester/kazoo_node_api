// // tslint:disable:no-unused-expression

// import { expect } from "chai";
// import "mocha";
// import { UserNew } from "../user/user-new.service";
// import server from "../../server";
// import * as request from "request-promise";
// import { NODE_HOST, NODE_PORT } from "../../config/env";
// import { IUserNew } from "../../interfaces";
// import { UserDeleteService } from "../user/user-delete.service";
// import { CallflowGetByOwnerService } from "./callflow-get-by-owner";
// import { CallflowDeleteService, CallflowCreateService } from ".";
// import { createNewUser } from "../user/user-new.service.spec";
// import { createNewCallflow } from "./callflow-create.service.spec";

// describe("Testing Callflow Get By Owner Service", async () => {

//   let userCreated: any;
//   let callflowCreated: any;

//   before( async () => {
//     await server.start();
//     const body: IUserNew = {
//       racf: "callflowgetbyowner",
//       department: "department",
//       email: "callflowgetbyowner@mock.com",
//       extension: "2222",
//       name: "Callflow Get By Owner"
//     };
//     userCreated = await createNewUser(body);
//     callflowCreated = await createNewCallflow(
//       userCreated.id, userCreated.username, body.extension
//     )
//   });

//   after( async () => {
//     await Promise.all([
//       UserDeleteService(userCreated.id),
//       CallflowDeleteService(callflowCreated.id)
//     ]).catch(err => err);
//     server.stop();
//   });

//   it("should get callflow by owner", async () => {
//     const response = await CallflowGetByOwnerService( userCreated.username );
//     expect(response.length).to.be.equal(1);
//   });
// }).timeout(5000);
