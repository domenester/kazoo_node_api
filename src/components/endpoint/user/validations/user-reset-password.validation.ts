import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserResetPasswordSchema = {
  newPassword: joi.string().required().disallow([joi.ref("password")]).error(validationErrorFunction),
  email: joi.string().required().error(validationErrorFunction)
};

export const UserResetPasswordValidation = ( body: any ) => {
  return joi.validate(body, UserResetPasswordSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserResetPasswordValidation"));
};
