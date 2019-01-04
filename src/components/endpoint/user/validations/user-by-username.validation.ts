import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const UserByUsernameSchema = {
  username: joi.string().required().error(validationErrorFunction)
};

export const UserByUsernameValidation = ( body: any ) => {
  return joi.validate(body, UserByUsernameSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserByUsernameValidation"));
};
