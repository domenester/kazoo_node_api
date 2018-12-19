import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb} from "../../endpoint.interface";
import { ConferenceActionParticipantValidation } from "../validations/conference-action-participant.validation";
import { ConferenceActionParticipantService } from "../../../../services";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class ConferenceActionParticipant implements IEndpoint<Request, {}> {
  public path = "/:id/:participantId/:action";
  public fullPath: string;
  public method: Verb = "put";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest) => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await ConferenceActionParticipantValidation(req.parameters);

    if (validation instanceof Error) {
      return validation;
    }

    const conferenceActionCreated = await ConferenceActionParticipantService(
      req.parameters.id, req.parameters.participantId, req.parameters.action
    );

    if (conferenceActionCreated instanceof Error) { return conferenceActionCreated; }

    return endpointResponseNormalizer(conferenceActionCreated);
  }
}
