import express from "express";
import { responseWrapper } from "../../routes/helpers/utils";
import { sendValidationEmail } from "./logic";
import { SendValidationEmailRequest } from "./types";

const emailsRouter = express.Router();

emailsRouter.post(
  "/send-validation-email",
  async (req: SendValidationEmailRequest, res) =>
    await responseWrapper<void>(sendValidationEmail(req), res)
);
