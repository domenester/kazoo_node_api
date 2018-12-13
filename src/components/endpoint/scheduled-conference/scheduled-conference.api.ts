
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../endpoint.interface";
import ScheduledConferenceCreate from "./endpoints/scheduled-conference-create";

class ScheduledConferenceApi implements IEndpointAPI {
  public path = "/scheduled_conferences";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new ScheduledConferenceCreate(this.logger, this.path),
    ];
  }
}

export default ScheduledConferenceApi;
