import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const ConferenceByIdSchema = {
  id: joi.string().error(validationErrorFunction)
};

export const ConferenceByIdValidation = ( body: any ) => {
  return joi.validate(body, ConferenceByIdSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ConferenceByIdValidation"));
};
