import express from "express";
import { responseWrapper } from "../../routes/helpers/utils";
import { sendValidationEmail, validateEmail } from "./logic";
import { SendValidationEmailRequest, ValidationEmailRequest } from "./types";

const emailsRouter = express.Router();

emailsRouter.post(
  "/send-validation-email",
  async (req: SendValidationEmailRequest, res) =>
    await responseWrapper<void>(sendValidationEmail(req), res)
);

emailsRouter.post(
  "/validate-email",
  async (req: ValidationEmailRequest, res) =>
    await responseWrapper<boolean>(validateEmail(req), res)
);

export { emailsRouter };
