import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";

export default class Home implements IEndpoint<Request, {}> {
  public path = "/";
  public fullPath: string;
  public method: Verb = "get";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = (request: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);
    // TODO: Logic to this endpoint
    return {content: "Hi"};
  }
}
