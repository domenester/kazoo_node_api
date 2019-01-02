
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import FilesUpload from "./endpoints/files-upload";

class FilesApi implements IEndpointAPI {
  public path = "";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new FilesUpload(this.logger, this.path),
    ];
  }
}

export default FilesApi;
