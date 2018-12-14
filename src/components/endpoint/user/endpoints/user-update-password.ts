import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService, LoginService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserUpdatePasswordValidation } from "../validations/user-update-password.validation";
import { errorGenerator } from "../../../error";
import { login as errorMessage } from "../../../../components/error/error-messages";
import { DeviceGetByOwnerService, DeviceUpdateService } from "../../../../services/device";
import { deviceUpdatePasswordNormalized } from "../../../../normalizer/device/device-update-password.normalizer";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class UserUpdatePassword implements IEndpoint<Request, {}> {
  public path = "/update_password/:id";
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

    const validation = await UserUpdatePasswordValidation(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const loginResponse = await LoginService({
      username: req.body.username,
      password: req.body.password
    });

    if (loginResponse.status !== "success") {
      errorGenerator( errorMessage.unauthorized, 401, "UserUpdatePassword");
    }

    const userUpdatePassResponse = await UserService.updatePassword(
      loginResponse.data.owner_id, req.body.password
    ).catch( err => {
      this.logger.error(`Error trying to update user '${req.body.username}' password`);
      return err;
    });
    
    const devicesByOwner = await DeviceGetByOwnerService(loginResponse.data.owner_id);

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
