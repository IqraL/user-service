import express from "express";
import {
  AuthLinkRequest,
  AuthLinkResponseSuccess,
  AuthRequest,
  AuthResponseSuccess,
  ValidJwtRequest,
  ValidJwtSuccess,
} from "./types";

import { loginOrSignUp } from "./logic/auth";
import { generateAuthenticationLink } from "./logic/auth-link";
import { responseWrapper } from "../utils";
import { validateToken } from "./logic/valid-token";

const authenticationRouter = express.Router();

authenticationRouter.post(
  "/auth-link",
  async (req: AuthLinkRequest, res) =>
    await responseWrapper<AuthLinkResponseSuccess>(
      generateAuthenticationLink(),
      res
    )
);

authenticationRouter.post(
  "/login",
  async (req: AuthRequest, res) =>
    await responseWrapper<AuthResponseSuccess>(loginOrSignUp(req), res)
);


authenticationRouter.post(
  "/valid-token",
  async (req: ValidJwtRequest, res) =>
    await responseWrapper<ValidJwtSuccess>(validateToken(req), res)
);

export { authenticationRouter };