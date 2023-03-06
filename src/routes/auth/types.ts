import { UserProfile } from "@midnight-moon/shared-types";
import { AuthJourney, ExpressPostRequest, ExpressRequest } from "../types";

export type AuthRequest = ExpressPostRequest<{
  code: string;
  company: string;
}>;

export type AuthResponseSuccess = {
  userData: UserProfile;
  jwt: string;
  authJourney: AuthJourney;
};

export type AuthLinkRequest = ExpressRequest;
export type AuthLinkResponseSuccess = { authorizationUrl: string };

export type ValidJwtRequest = ExpressPostRequest<{
  token: string;
}>;

export type ValidJwtSuccess = {
  isValidJwt: boolean;
};
