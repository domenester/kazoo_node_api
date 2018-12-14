import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ClearVideoValidation } from "../validations/clear-video.validation";
import { promisify } from "util";
import { exec } from "child_process";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ClearVideo implements IEndpoint<Request, {}> {
  public path = "/:conferenceId/clearvideo";
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await ClearVideoValidation(req.parameters);

    if (validation instanceof Error) { return validation; }

    const execPromisified = promisify(exec);
    const commandLine = `fs_cli -H freeswitch-1.interaxa.com -x conference ${req.parameters.conferenceId} vid-floor ${req.parameters.memberId} -force`;
    const { stdout, stderr } = await execPromisified(commandLine).catch(err => err);
    
    this.logger.info(`Command line executed: ${commandLine}`);
    this.logger.info(`Command line stdout: ${stdout}`);
    this.logger.info(`Command line stderr: ${stderr}`);

    return endpointResponseNormalizer({ stdout, stderr });
  }
}
