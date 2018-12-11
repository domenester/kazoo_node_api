import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserUpdateValidation } from "../validations/user-update.validation";
import { CallflowUpdateService } from "../../../../services/callflow/callflow-update";
import { callflowUpdateNormalized } from "../../../../normalizer/callflow/callflow-update.normalizer";

export default class UserUpdate implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}/`;
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await UserUpdateValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const userUpdate = await UserService.update(req.body);
    if (userUpdate instanceof Error) { return userUpdate; }

    let callflowUpdate;
    if (req.body.extension) {
      callflowUpdate = await CallflowUpdateService(
        callflowUpdateNormalized([userUpdate.data.username, req.body.extension]), userUpdate.data.callflow
      ).catch(err => {
        this.logger.error(`Error trying to update callflow for user: ${userUpdate.data.username}`);
        return err;
      });
    }
    userUpdate.data["extension"] = req.body.extension;
    return {data: userUpdate, message: responseMessages.userUpdate};
  }
}
