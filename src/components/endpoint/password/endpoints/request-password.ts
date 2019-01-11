import {Request} from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import * as request from "request-promise";
import * as winston from "winston";
import Mailer from "../../../../components/mailer/mailer";
import { UserService } from "../../../../services";
import {HandlerResponse, IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { errorGenerator } from "../../../error/error";
import { requestPassword as errorMessage } from "../../../error/error-messages";
import { RequestPasswordValidation } from "../validations";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserEmailExists } from "../../../../services/user/user-email-exists";
import { FRONTEND_BACKOFFICE_URL } from "../../../../config/env";

export default class RequestPassword implements IEndpoint<Request, {}> {
  public path = "request";
  public fullPath: string;
  public method: Verb = "post";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}/${this.path}`;
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await RequestPasswordValidation(req.body);
    if (validation instanceof Error) { validation; }

    const emailExists = await UserEmailExists(
      req.body.email
    ).catch(err => err);
    if (emailExists instanceof Error) { return emailExists; }
    if (!emailExists) { return errorGenerator(errorMessage.emailNotFound, 400, "RequestPassword");}

    const token = jwt.sign(
      { email: req.body.email }, process.env.JWT_SECRET, { expiresIn: 60 * 10 },
    );

    const mailResponse = await Mailer({
      subject: "Solicitação de recadastro de senha",
      text: `${FRONTEND_BACKOFFICE_URL()}/forgotPassword?token=${token}`,
      to: req.body.email,
    }).catch((err) => errorGenerator(err, 500, "ForgotPasswordMail"));

    // const mailResponse = { emailResponseMocked: true };

    if (mailResponse instanceof Error) { return mailResponse; }
    return { data: mailResponse, message: responseMessages.requestPassword };
  }
}
