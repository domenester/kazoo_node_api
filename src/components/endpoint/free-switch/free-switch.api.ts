
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../endpoint.interface";
import SetVideo from "./endpoints/set-video";
import ClearVideo from "./endpoints/clear-video";

class FreeSwitchApi implements IEndpointAPI {
  public path = "/freeswitch";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new ClearVideo(this.logger, this.path),
      new SetVideo(this.logger, this.path)
    ];
  }
}

export default FreeSwitchApi;
