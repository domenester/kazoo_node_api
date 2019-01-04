import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { imagesFormatsAllowed, pathToUpload } from "../../../../config/images";
import { updateUserPicture as errorMessage } from "../../../error/error-messages";
import * as fs from "fs-extra";
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
    this.fullPath = `${this.path}`;
  }
  public handler = async (request: IRequest): Promise<HandlerResponse> => {
    const file = request.body;
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const pathSplit = file.originalname.split(".");
    if ( imagesFormatsAllowed.indexOf(pathSplit[pathSplit.length - 1]) === -1 ) {
      return errorGenerator(errorMessage.formatInvalid, 400, "UploadProfilePicture");
    }

    // Create path if don't exist
    await fs.mkdirs(pathToUpload());

    const userId = request.headers["userid"];
    const imageName = `${userId}.${pathSplit[pathSplit.length - 1]}`;
    const targetPath = `${pathToUpload()}/${imageName}`;
    let path = `${pathToUpload()}/${file.filename}`;
    const fileTemp = await fs.readFile(path);
    await fs.writeFile(targetPath, fileTemp, {encoding: "binary"});

    return endpointResponseNormalizer({data: true}, responseMessages.uploadProfilePicture);
  }
}
