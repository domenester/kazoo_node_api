import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserNewValidation } from "../validations/user-new.validation";
import { DeviceCreateService } from "../../../../services/device";
import { CallflowCreateService } from "../../../../services/callflow";
import { UserUpdateService } from "../../../../services/user/user-update.service";

export default class UserNew implements IEndpoint<Request, {}> {
  public path = "/";
  public fullPath: string;
  public method: Verb = "put";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await UserNewValidation(req.body);
    if (validation instanceof Error) { return validation; }

    let userAdded = await UserService.add(
      req.body
    ).catch(err => {
      this.logger.error(`Falha ao inserir usuário: ${JSON.stringify(req.body)}`)
      return err;
    });
    
    if (userAdded instanceof Error) { return userAdded; }

    const deviceCreated = await DeviceCreateService(
      userAdded.data.id, req.body.racf
    ).catch(err => {
      this.logger.error(`Falha ao inserir device para: ${JSON.stringify(req.body)}`)
      return err;
    });

    const callflowCreated = await CallflowCreateService(
      userAdded.data.id, req.body.racf, req.body.extension
    ).catch(err => {
      this.logger.error(`Falha ao inserir callflow para: ${JSON.stringify(req.body)}`)
      return err;
    });

    let userUpdated = undefined;
    if ( !(deviceCreated instanceof Error) ) {
      userUpdated = await UserUpdateService({
        id: userAdded.data.id,
        devices: [deviceCreated.data.id],
        callflow: callflowCreated.data.id
      }).catch(err => {
        this.logger.error(`Falha ao atualizar dados de callflow e devices para: ${JSON.stringify(req.body)}`)
        return err;
      });
    }

    return {data: userUpdated || userAdded, message: responseMessages.userNew};
  }
}
