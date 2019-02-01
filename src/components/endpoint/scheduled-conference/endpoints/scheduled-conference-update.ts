import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ScheduledConfDeleteService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";
import { ScheduledConferenceDeleteValidation, ScheduledConfUpdateValidation } from "../validations"
import { ScheduledConfUpdateService } from "../../../../services/scheduled-conference/scheduled-conference-update.service";

export default class ScheduledConfUpdate implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "put";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await ScheduledConfUpdateValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const response = await ScheduledConfUpdateService(req.body);
    if (response instanceof Error) { return response; }

    return endpointResponseNormalizer(response);
  }
}
