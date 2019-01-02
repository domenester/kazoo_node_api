import {Request} from "express-serve-static-core";
import * as winston from "winston";
import * as fs from "fs-extra";
import {IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { pathToUploadFiles, pathMulterTempFile } from "../../../../config/files";
import { endpointResponseNormalizer } from "../../../../normalizer";
import responseMessages from "../../../../config/endpoints-response-messages";
import { NODE_URL } from "../../../../config/env";

export const UploadFilePath = "/tmp";

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
    const fileName = `${file.originalname}`;
    const targetPath = `${pathToUploadFiles()}/${fileName}`;
    const tempFilepath = `${pathMulterTempFile()}/${file.filename}`;
    const fileTemp = await fs.readFile(tempFilepath);
    await fs.writeFile(targetPath, fileTemp, {encoding: "binary"});

    return endpointResponseNormalizer({
      name: fileName,
      type: file.mimetype,
      url: `${NODE_URL()}/tmp/${fileName}`
    }, responseMessages.uploadFile);
  }
}
