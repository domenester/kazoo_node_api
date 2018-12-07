import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserByIdSchema = {
  id: joi.string().required().error(validationErrorFunction),
};

export const UserByIdValidation = ( body: any ) => {
  return joi.validate(body, UserByIdSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserByIdValidation"));
};
