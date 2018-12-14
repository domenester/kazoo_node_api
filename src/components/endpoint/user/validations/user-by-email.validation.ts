import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const UserByEmailSchema = {
  email: joi.string().required().email().max(255).error(validationErrorFunction)
};

export const UserByEmailValidation = ( body: any ) => {
  return joi.validate(body, UserByEmailSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserByEmailValidation"));
};
