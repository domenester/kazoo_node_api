import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ScheduledConfCreateService, ScheduledConfListService, ScheduledConfByIdService, ScheduledConfDeleteService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ScheduledConferenceDelete implements IEndpoint<Request, {}> {
  public path = "/conferences/:conferenceId";
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

    // TODO: Verify the right schema to validate it
    // const validation = await ReportListValidation(req.parameters);
    // if (validation instanceof Error) { return validation; }

    const response = await ScheduledConfDeleteService(req.parameters.conferenceId);
    if (response instanceof Error) { return response; }

    return endpointResponseNormalizer(response);
  }
}
