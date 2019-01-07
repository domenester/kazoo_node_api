import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const ScheduledConferenceDeleteSchema = {
  id: joi.string().required().error(validationErrorFunction)
};

export const ScheduledConferenceDeleteValidation = ( body: any ) => {
  return joi.validate(body, ScheduledConferenceDeleteSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ScheduledConferenceDeleteValidation"));
};
