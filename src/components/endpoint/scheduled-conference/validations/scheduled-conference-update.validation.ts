import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const ScheduledConfUpdateSchema = {
  id: joi.string().required().error(validationErrorFunction),
  moderator: joi.string().optional().error(validationErrorFunction),
  date: joi.string().optional().error(validationErrorFunction),
  subject: joi.string().optional().error(validationErrorFunction),
  body: joi.string().optional().error(validationErrorFunction),
  participants: joi.array().items(
    joi.object().keys({
      participant: joi.string().optional().error(validationErrorFunction),
      email: joi.string().optional().email().max(255).error(validationErrorFunction)
    }).optional()
  )
};

export const ScheduledConfUpdateValidation = ( body: any ) => {
  return joi.validate(body, ScheduledConfUpdateSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ScheduledConfUpdateValidation"));
};
