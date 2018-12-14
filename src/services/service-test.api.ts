import * as request from "request-promise";
import { errorGenerator } from "../components/error";
import {default as logger} from "../components/logger/logger";
import { AuthApiService } from "./auth-api.service";
import { Verb } from "../components/endpoint/endpoint.interface";
import { NODE_HOST, NODE_PORT } from "../config/env";

export class ServiceTestApi {

  private path = `http://${NODE_HOST()}:${NODE_PORT()}`;
  private fullPath: string;
  private options = async ( method: Verb, body: any = {} ): Promise<request.RequestPromiseOptions> => {
    const options = {
      headers: {
        "Content-Type": "application/json"
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

  constructor(location: string) {
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
      logger.error(`Error testing: ${this.fullPath}`);
      try {
        const message = JSON.parse(err.error).message;
        return errorGenerator( message, err.statusCode, stack);
      } catch (err) {
        return errorGenerator( err, err.statusCode, stack); 
      }
    });
    if (response instanceof Error) { return response; }
    return response;
  }
};

export const serviceTestApi = (location: string) => {
  return new ServiceTestApi(location);
}
