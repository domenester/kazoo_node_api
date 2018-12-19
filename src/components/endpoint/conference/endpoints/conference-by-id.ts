import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ConferenceCreateService } from "../../../../services";
import { ConferenceByIdValidation } from "../validations/conference-by-id.validation";
import { ConferenceByIdService } from "../../../../services/conference/conference-by-id.service";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ConferenceById implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "get";
  public bodySchema = ConferenceByIdValidation;
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await this.bodySchema(req.parameters);

    if (validation instanceof Error) {
      return validation;
    }

    const conferenceById = await ConferenceByIdService( req.parameters.id );

    if (conferenceById instanceof Error) { return conferenceById; }

    return endpointResponseNormalizer(conferenceById);
  }
}
