import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserUpdateSchema = {
  id: joi.string().required().error(validationErrorFunction),
  name: joi.string().optional().max(100).error(validationErrorFunction),
  racf: joi.string().optional().max(10).error(validationErrorFunction),
  extension: joi.string().optional().regex(/^\d+$/).required().max(10).error(validationErrorFunction),
  email: joi.string().optional().email().max(255).error(validationErrorFunction),
  department: joi.string().optional().max(100).error(validationErrorFunction),
  profile: joi.string().optional().valid(enums.perfil.values).error(validationErrorFunction)
};

export const UserUpdateValidation = ( body: any ) => {
  return joi.validate(body, UserUpdateSchema)
  .catch( (err) => errorGenerator(err.message, 401, "UserUpdateValidation"));
};
