import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ScheduledConfByUserService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ScheduledConferenceByUser implements IEndpoint<Request, {}> {
  public path = "/:user";
  public fullPath: string;
  public method: Verb = "get";
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

    const response = await ScheduledConfByUserService(req.parameters.user);
    if (response instanceof Error) { return response; }

    return endpointResponseNormalizer(response);
  }
}
