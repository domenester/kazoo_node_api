import * as joi from "joi";
import { validationErrorFunction } from "../../../../utils/validation";
import { errorGenerator } from "../../../error/error";

const SetVideoSchema = {
  conferenceId: joi.string().error(validationErrorFunction),
  memberId: joi.string().error(validationErrorFunction)
};

export const SetVideoValidation = ( body: any ) => {
  return joi.validate(body, SetVideoSchema)
  .catch( (err) => errorGenerator(err.message, 400, "SetVideoValidation"));
};
