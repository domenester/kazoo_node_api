
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../endpoint.interface";
import ScheduledConferenceCreate from "./endpoints/scheduled-conference-create";
import ScheduledConferenceList from "./endpoints/scheduled-conference-list";
import ScheduledConferenceById from "./endpoints/scheduled-conference-by-id";
import ScheduledConferenceByUser from "./endpoints/scheduled-conference-by-user";
import ScheduledConferenceDelete from "./endpoints/scheduled-conference-delete";

class ScheduledConferenceApi implements IEndpointAPI {
  public path = "/scheduled_conferences";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new ScheduledConferenceCreate(this.logger, this.path),
      new ScheduledConferenceList(this.logger, this.path),
      new ScheduledConferenceById(this.logger, this.path),
      new ScheduledConferenceByUser(this.logger, this.path),
      new ScheduledConferenceDelete(this.logger, this.path)
    ];
  }
}

export default ScheduledConferenceApi;
