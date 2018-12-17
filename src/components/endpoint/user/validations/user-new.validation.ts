import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserNewSchema = {
  name: joi.string().required().max(100).error(validationErrorFunction),
  racf: joi.string().required().max(10).error(validationErrorFunction),
  extension: joi.string().regex(/^\d+$/).required().max(10).error(validationErrorFunction),
  email: joi.string().required().email().max(255).error(validationErrorFunction),
  department: joi.string().required().max(100).error(validationErrorFunction),
  profile: joi.string().optional().valid(enums.perfil.values).error(validationErrorFunction)
};

export const UserNewValidation = ( body: any ) => {
  return joi.validate(body, UserNewSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserNewValidation"));
};
