import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";
import enums from "../enums";

const UserByDepartmentSchema = {
  department: joi.string().required().error(validationErrorFunction),
};

export const UserByDepartmentValidation = ( body: any ) => {
  return joi.validate(body, UserByDepartmentSchema)
  .catch( (err) => errorGenerator(err.message, 400, "UserByDepartmentValidation"));
};
