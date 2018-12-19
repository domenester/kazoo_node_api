import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ConferenceCreateValidation } from "../validations/conference-create.validation";
import { ConferenceCreateService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ConferenceCreate implements IEndpoint<Request, {}> {
  public path = "/:id/:endpoint";
  public fullPath: string;
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await ConferenceCreateValidation(req.parameters);

    if (validation instanceof Error) {
      return validation;
    }

    const conferenceCreated = await ConferenceCreateService(
      req.parameters.id, req.parameters.endpoint
    );

    return endpointResponseNormalizer(conferenceCreated);
  }
}
