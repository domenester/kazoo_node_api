import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { imagesFormatsAllowed, pathToUpload } from "../../../../config/images";
import { updateUserPicture as errorMessage } from "../../../error/error-messages";
import * as fs from "fs";
import { promisify } from "util";
import * as path from "path";
import { UserService } from "../../../../services";
import { UserProfilePictureValidation } from "../validations/user-profile-picture.validation";
import responseMessages from "../../../../config/endpoints-response-messages";
import { errorGenerator } from "../../../error";
import { endpointResponseNormalizer } from "../../../../normalizer";

const fsRename = promisify(fs.rename);

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
    const pathSplit = request.body.originalname.split(".");
    if ( imagesFormatsAllowed.indexOf(pathSplit[pathSplit.length - 1]) === -1 ) {
      return errorGenerator(errorMessage.formatInvalid, 400, "UploadProfilePicture");
    }
    const imageName = `${request.body.id}.${pathSplit[pathSplit.length - 1]}`;
    const targetPath = `${pathToUpload()}/${imageName}`;
    await fsRename(request.body.path, targetPath).catch(err => err);

    return endpointResponseNormalizer({data: true}, responseMessages.uploadProfilePicture);
  }
}
