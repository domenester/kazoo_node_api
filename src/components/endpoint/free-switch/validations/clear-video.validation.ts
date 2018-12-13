import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const ClearVideoSchema = {
  conferenceId: joi.string().error(validationErrorFunction)
};

export const ClearVideoValidation = ( body: any ) => {
  return joi.validate(body, ClearVideoSchema)
  .catch( (err) => errorGenerator(err.message, 400, "ClearVideoValidation"));
};
