
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../endpoint.interface";
import Report from "./endpoints/report-list";

class ConferenceApi implements IEndpointAPI {
  public path = "/conferences";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new Report(this.logger),
    ];
  }
}

export default ConferenceApi;
