import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { RecordService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { RecordListValidation } from "../validations/record-list.validation";

export default class RecordList implements IEndpoint<Request, {}> {
  public path = "list";
  public fullPath: string;
  public method: Verb = "get";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}/${this.path}`
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await RecordListValidation(req.parameters);

    if (validation instanceof Error) {
      return validation;
    }

    const listRecord = await RecordService.list(req.parameters || {});
    if (listRecord instanceof Error) { return listRecord; }

    return {data: listRecord};
  }
}
