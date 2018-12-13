// // tslint:disable:no-unused-expression

// import { expect } from "chai";
// import "mocha";
// import server from "../../server";
// import { ScheduledConfCreateService, ScheduledConfCreateWithIdService } from "./";
// import { bodyCreate } from "./mocks";
// import { ScheduledConfDeleteService } from "./scheduled-conference-delete.service";

// describe("Testing Schedule Conference Create Service", async () => {

//   let scheduledConferenceCreated: any;

//   before("Starting server...", async () => {
//     await server.start();
//   });

//   after( async () => {
//     server.stop();
//   });

//   it("should add new schedule conference", async () => {
//     const id = "someid";
//     let response = await ScheduledConfCreateWithIdService(
//       id, bodyCreate
//     ).catch(err => err);
//     expect(response.id).to.be.equal(id);
//     scheduledConferenceCreated = response;
//   });
// });
