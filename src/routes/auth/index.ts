import express from "express";
import {
  AuthLinkRequest,
  AuthLinkResponseSuccess,
  AuthRequest,
  AuthResponseSuccess,
  IsUserRegisteredRequest,
  ValidJwtRequest,
  ValidJwtSuccess,
} from "@midnight-moon/shared-types";

import { login } from "./logic/login";
import { generateAuthenticationLink } from "./logic/auth-link";
import { responseWrapper } from "../helpers/utils";
import { validateToken } from "./logic/valid-token";
import { isUserRegistered } from "./logic/is-user-registered";

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
    await responseWrapper<AuthResponseSuccess>(login(req), res)
);

authenticationRouter.post(
  "/is-user-registered",
  async (req: IsUserRegisteredRequest, res) =>
    await responseWrapper<boolean>(isUserRegistered(req), res)
);

authenticationRouter.post(
  "/valid-token",
  async (req: ValidJwtRequest, res) =>
    await responseWrapper<ValidJwtSuccess>(validateToken(req), res)
);

export { authenticationRouter };
