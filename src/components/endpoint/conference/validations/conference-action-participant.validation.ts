import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

/**
 * According to Kazoo documentation, the only actions valid values is:
 * "mute", "unmute", "deaf", "undeaf", "kick", "relate"
 */

const ConferenceActionParticipantSchema = {
  id: joi.string().required().error(validationErrorFunction),
  participantId: joi.string().required().error(validationErrorFunction),
  action: joi.string().required().valid([
    "mute", "unmute", "deaf", "undeaf", "kick", "relate"
  ]).error(validationErrorFunction)
};

export const ConferenceActionParticipantValidation = ( body: any ) => {
  return joi.validate(body, ConferenceActionParticipantSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ConferenceActionParticipantValidation"));
};
