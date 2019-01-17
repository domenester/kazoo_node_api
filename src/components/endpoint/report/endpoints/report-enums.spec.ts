// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import ReportEnums from "./report-enums";
import ReportApi from "../report.api";
import enums from "../report.enums";
import { NODE_HOST, NODE_PORT, PROTOCOL } from "../../../../config/env";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const reportEnumsByEndpoint = async () => {
  const reportApi = new ReportApi(logger);
  const reportEnums = new ReportEnums(logger, reportApi.path);
  const serviceTestApiInstance = new ServiceTestApi(reportEnums.fullPath);
  const response = await serviceTestApiInstance.request(
    reportEnums.method, {}, {}, "Testing Report Enums"
  );
  return response;
}

describe("Testing Report Enums", async () => {

  it("Starting server...", async () => {
    await server.start();
  }).timeout(10000);

  after( async () => {
    server.stop();
  });

  it("should return report enums", async () => {
    const response = await reportEnumsByEndpoint();
    expect(response.data).to.be.deep.equal(enums);
  });
});
