// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import MessageList from "./message-list";
import MessageApi from "../message.api";
import { NODE_HOST, NODE_PORT, PROTOCOL } from "../../../../config/env";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const messagesByEndpoint = async () => {
  const messageApi = new MessageApi(logger);
  const messageList = new MessageList(logger, messageApi.path);
  const serviceTestApiInstance = new ServiceTestApi(messageList.fullPath);
  const response = await serviceTestApiInstance.request(
    messageList.method, {}, {}, "Testing Messages Endpoints"
  );
  return response;
}

describe.only("Testing Messages", async () => {

  it("Starting server...", async () => {
    await server.start();
  }).timeout(10000);

  after( async () => {
    server.stop();
  });

  it("should return all messages", async () => {
    let response = await messagesByEndpoint();
    expect(response.data).to.be.not.null;
  }).timeout(5000);
});
