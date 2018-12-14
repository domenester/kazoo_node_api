import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService, LoginService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { errorGenerator } from "../../../error";
import { user as errorMessage, user } from "../../../../components/error/error-messages";
import { DeviceGetByOwnerService, DeviceUpdateService } from "../../../../services/device";
import { deviceUpdatePasswordNormalized } from "../../../../normalizer/device/device-update-password.normalizer";
import { UserResetPasswordValidation } from "../validations/user-reset-password.validation";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class UserResetPassword implements IEndpoint<Request, {}> {
  public path = "/reset_password";
  public fullPath: string;
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await UserResetPasswordValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    let userByEmail = await UserService.getByEmail(req.body.email);

    if (userByEmail.data.length < 1) {
      return errorGenerator( errorMessage.byEmail, 400, "UserResetPassword");
    } else {
      userByEmail = userByEmail.data[0];
    }

    const userUpdatePassResponse = await UserService.updatePassword(
      userByEmail.id, req.body.newPassword
    ).catch( err => {
      this.logger.error(`Error trying to update user '${req.body.username}' password`);
      return err;
    });
    
    const devicesByOwner = await DeviceGetByOwnerService(userByEmail.id);

    devicesByOwner.data.map( async (device) => {
      await DeviceUpdateService(
        deviceUpdatePasswordNormalized(req.body.newPassword), device.id
      ).catch(err => {
        this.logger.error(`Error trying to update user device '${device.numbers}' password`)
      });
    });

    return endpointResponseNormalizer({ data: true}, responseMessages.resetPassword);
  }
}
