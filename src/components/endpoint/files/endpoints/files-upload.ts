import {Request} from "express-serve-static-core";
import * as winston from "winston";
import * as fs from "fs-extra";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { pathToUploadFiles, pathMulterTempFile, pathToUploadFilesPublic, pathPublicImages } from "../../../../config/files";
import { endpointResponseNormalizer } from "../../../../normalizer";
import responseMessages from "../../../../config/endpoints-response-messages";
import * as uuid from "uuid";

export const UploadFilePath = "/upload_file";

export default class FilesUpload implements IEndpoint<Request, {}> {
  public path = UploadFilePath;
  public method: Verb = "post";
  public fullPath = "";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const file = req.body;

    // Create path if don't exist
    await fs.mkdirs(pathToUploadFiles());
    const fileNameSplit = file.originalname.split(".");
    const extension = fileNameSplit[fileNameSplit.length - 1];
    const fileName = `${uuid.v4()}.${extension}`;

    const targetPath = `${pathToUploadFiles()}/${fileName}`;
    const targetPathPublic = `${pathToUploadFilesPublic()}/${fileName}`;

    const tempFilepath = `${pathMulterTempFile()}/${file.filename}`;
    const fileTemp = await fs.readFile(tempFilepath);

    Promise.all([
      fs.writeFile(targetPath, fileTemp, {encoding: "binary"}),
      fs.writeFile(targetPathPublic, fileTemp, {encoding: "binary"})
    ]).catch(err => err);

    return endpointResponseNormalizer({
      name: fileName,
      type: file.mimetype,
      url: `${pathPublicImages()}/${fileName}`,
      size: file.size
    }, responseMessages.uploadFile);
  }
}
