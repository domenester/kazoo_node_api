import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ConferenceActionValidation } from "../validations/conference-action.validation";
import { ConferenceActionService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ConferenceAction implements IEndpoint<Request, {}> {
  public path = "/:id/:action";
  public fullPath: string;
  public method: Verb = "put";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await ConferenceActionValidation(req.parameters);

    if (validation instanceof Error) {
      return validation;
    }

    const conferenceCreated = await ConferenceActionService(
      req.parameters.id, req.parameters.action
    );

    if (conferenceCreated instanceof Error) { return conferenceCreated; }

    return endpointResponseNormalizer(conferenceCreated);
  }
}
