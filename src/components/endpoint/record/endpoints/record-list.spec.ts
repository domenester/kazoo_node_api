// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import { IRequest } from "../../endpoint.interface";
import RecordList from "./record-list";
import RecordApi from "../record.api";
import { NODE_HOST, NODE_PORT, PROTOCOL } from "../../../../config/env";
import { ServiceTestApi } from "../../../../services/service-test.api"

export const listRecordByEndpoint = async () => {
  const recordApi = new RecordApi(logger);
  const recordList = new RecordList(logger, recordApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${recordList.fullPath}`);
  const response = await serviceTestApiInstance.request(
    recordList.method, {}, {}, "Testing List Recod"
  );
  return response;
}

describe("Testing Records", async () => {

  const env = process.env;
  const recordApi = new RecordApi(logger);
  const recordList = new RecordList(logger, recordApi.path);

  it("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should return all records", async () => {
    let response = await listRecordByEndpoint();
    expect(response.data.length).to.be.gte(2);
  });
});
