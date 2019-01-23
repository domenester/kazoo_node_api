import { Request } from "express-serve-static-core";
import * as winston from "winston";
import { IEndpoint, IRequest, Verb, HandlerResponse } from "../../../endpoint/endpoint.interface";
import { UserService, CallflowDeleteService, ScheduledConfByUserService, ScheduledConfDeleteService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserDeleteValidation } from "../validations/user-delete.validation";
import { endpointResponseNormalizer } from "../../../../normalizer";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import { DeviceDeleteService } from "../../../../services/device";

export default class UserNew implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "delete";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await UserDeleteValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userDeleted = await UserService.remove(req.parameters.id);
    if (userDeleted instanceof Error) { return userDeleted; }

    ScheduledConfByUserService(userDeleted.data.username).then(
      confs => Promise.all(confs.map(conf => ScheduledConfDeleteService(conf.id)))).catch(err => err);

    if (userDeleted.data.devices) {
      await Promise.all(
        userDeleted.data.devices.map(d => DeviceDeleteService(d))
      ).catch(err => err);
    }

    if (userDeleted.data.callflow) {
      await CallflowDeleteService(userDeleted.data.callflow).catch(err => err);
    }

    return endpointResponseNormalizer(userDeleted, responseMessages.userDelete);
  }
}
