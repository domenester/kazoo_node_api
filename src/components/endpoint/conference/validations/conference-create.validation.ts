import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const ConferenceCreateSchema = {
  id: joi.string().optional().error(validationErrorFunction),
  endpoint: joi.string().optional().error(validationErrorFunction)
};

export const ConferenceCreateValidation = ( body: any ) => {
  return joi.validate(body, ConferenceCreateSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ConferenceCreateValidation"));
};
