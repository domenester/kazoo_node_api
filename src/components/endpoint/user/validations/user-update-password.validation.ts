import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserUpdatePasswordSchema = {
  newPassword: joi.string().required().disallow([joi.ref("password")]).error(validationErrorFunction),
  password: joi.string().required().error(validationErrorFunction),
  id: joi.string().required().error(validationErrorFunction),
  username: joi.string().required().error(validationErrorFunction)
};

export const UserUpdatePasswordValidation = ( body: any ) => {
  return joi.validate(body, UserUpdatePasswordSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserUpdatePasswordValidation"));
};
