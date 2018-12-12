import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

/**
 * According to Kazoo documentation, the only actions valid values is:
 * "mute", "unmute", "deaf", "undeaf", "kick", "relate"
 */

const ConferenceActionSchema = {
  id: joi.string().required().error(validationErrorFunction),
  action: joi.string().required().valid([
    "mute", "unmute", "deaf", "undeaf", "kick", "relate"
  ]).error(validationErrorFunction)
};

export const ConferenceActionValidation = ( body: any ) => {
  return joi.validate(body, ConferenceActionSchema)
  .catch( (err) => errorGenerator(err.message, 401, "ConferenceActionValidation"));
};
