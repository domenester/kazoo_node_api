import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserByExtensionSchema = {
  extension: joi.string().required().error(validationErrorFunction),
};

export const UserByExtensionValidation = ( body: any ) => {
  return joi.validate(body, UserByExtensionSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserByExtensionValidation"));
};
