import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserNewValidation } from "../validations/user-new.validation";
import { DeviceCreateService } from "../../../../services/device";
import { CallflowCreateService } from "../../../../services/callflow";
import { UserUpdateService } from "../../../../services/user/user-update.service";
import { endpointResponseNormalizer } from "../../../../normalizer";
import { UserByIdService } from "../../../../services/user/user-by-id.service";
import { userContactsNormalized } from "../../../../normalizer/user/user-contacts.normalizer";

export default class UserAddContact implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    // const validation = await UserNewValidation(req.body);
    // if (validation instanceof Error) { return validation; }

    const userById = await UserByIdService(req.parameters.id).catch(err => err);
    let userData = userById.data;
    let hasContactInList = false;

    if ( Object.keys(userData.contact_list).length === 0 || !userData.contact_list.contacts ) {
      userData.contact_list = { contacts: [] };
    } else {
      userData.contact_list.contacts.map( c => {
        if (req.body.username === c.username) {
          return hasContactInList = true;
        }
      });
    }

    if ( !hasContactInList ) {
      userData.contact_list.contacts.push(
        userContactsNormalized(req.body)
      );
      const userUpdated = await UserUpdateService({
        id: userData.id,
        contactList: userData.contact_list
      }).catch(err => {
        this.logger.error("Erro ao adicionar usuário em lista de contatos");
        return err;
      });
      return endpointResponseNormalizer( userUpdated.data , responseMessages.userContactAdded);
    } else {
      return endpointResponseNormalizer( { data: false } , responseMessages.userContactNotAdded);
    }
  }
}
