import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ScheduledConfDeleteService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";
import { ScheduledConferenceDeleteValidation } from "../validations"

export default class ScheduledConferenceDelete implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "delete";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await ScheduledConferenceDeleteValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const response = await ScheduledConfDeleteService(req.parameters.id);
    if (response instanceof Error) { return response; }

    return endpointResponseNormalizer(response);
  }
}
