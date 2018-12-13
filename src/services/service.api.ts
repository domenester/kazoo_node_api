import * as request from "request-promise";
import { errorGenerator } from "../components/error";
import {default as logger} from "../components/logger/logger";
import { AuthApiService } from "./auth-api.service";
import { Verb } from "../components/endpoint/endpoint.interface";

class ServiceApi {

  private path = `${process.env.KAZOO_URL_SERVICES}`;
  private fullPath: string;
  private options = async ( method: Verb, body: any = {} ): Promise<request.RequestPromiseOptions> => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
      },
      method,
      rejectUnauthorized: false
    }
    if (Object.keys(body).length > 0) {
      return { ...options, body: JSON.stringify(body) }
    } else {
      return options;
    }
  };

  constructor(location: string, path?: string) {
    if (path) { this.path = path; }
    this.fullPath = `${this.path}${location}`;
  }

  async request(
    method: Verb,
    body: any = {},
    options: request.RequestPromiseOptions = {},
    stack: string = "No Stack Informed") {
    const defaultOptions = await this.options(method, body);
    const response = await request(
      this.fullPath, { ...defaultOptions, ...options },
    ).then(res => JSON.parse(res))
    .catch( (err) => {
      logger.error(`Error requesting for: ${this.fullPath}`);
      return errorGenerator( err, err.statusCode, stack);
    });
    return response;
  }
};

export const serviceApi = (location: string, path?: string) => {
  return new ServiceApi(location, path);
}