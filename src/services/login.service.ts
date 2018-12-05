import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../components/error";
import {default as logger} from "../components/logger/logger";
import * as crypto from "crypto";

export interface ILoginServiceInput {
  username: string;
  password: string;
}

export const LoginService = async (body: ILoginServiceInput): Promise<any> => {
  const path = `${process.env.KAZOO_API_URL}/user_auth`;
  const md5Hash = crypto.createHash('md5').update(
    `${body.username}:${body.password}`
  ).digest('hex');
  const response = await request(
    path, {
      body: JSON.stringify({
        data: {
          credentials: md5Hash,
          realm: process.env.KAZOO_SIP_DOMAIN
        }
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      rejectUnauthorized: false,
    },
  ).catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      errorMessage.unauthorized,
      err.statusCode,
      "Login");
  });
  
  try {
    return JSON.parse(response);
  } catch(err) {
    return response;
  }
};
