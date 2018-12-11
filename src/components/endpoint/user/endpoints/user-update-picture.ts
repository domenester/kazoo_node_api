import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import * as fs from "fs";
import { UserService } from "../../../../services";
import { UserProfilePictureValidation } from "../validations/user-profile-picture.validation";
import responseMessages from "../../../../config/endpoints-response-messages";
import { errorGenerator } from "../../../error";

export const UploadProfilePicturePath = "/upload_photo";

export default class UploadProfilePicture implements IEndpoint<Request, {}> {
  public path = UploadProfilePicturePath;
  public method: Verb = "post";
  public fullPath: string;
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (request: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);
    // if (!request.body || !request.body.path) return errorGenerator("Arquivo não encontrado na requisição.", 401, "UploadProfilePicture")

    // const picture = fs.createReadStream(request.body.path);

    // const uploadPictureService = await UserService.updateProfilePicture(request.headers.userid as string, picture);
    // if (uploadPictureService instanceof Error) { return uploadPictureService; }

    return {data: null, message: responseMessages.uploadProfilePicture};
  }
}
