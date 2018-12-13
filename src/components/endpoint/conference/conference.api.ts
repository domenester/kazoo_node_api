
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../endpoint.interface";
import ConferenceCreate from "./endpoints/conference-create";
import ConferenceAction from "./endpoints/conference-action";
import ConferenceActionParticipant from "./endpoints/conference-action-participant";
import ConferenceById from "./endpoints/conference-by-id";

class ConferenceApi implements IEndpointAPI {
  public path = "/conferences";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new ConferenceCreate(this.logger, this.path),
      new ConferenceAction(this.logger, this.path),
      new ConferenceActionParticipant(this.logger, this.path),
      new ConferenceById(this.logger, this.path)
    ];
  }
}

export default ConferenceApi;
