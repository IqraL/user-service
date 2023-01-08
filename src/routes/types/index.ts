import { UserProfile } from "../../ui-types";
import { Request, Response } from "express";
import { AuthJourney } from "./ui-types";

export { AuthJourney };

export type AuthLinkRequest = ExpressRequest;
export type AuthLinkResponse = Response<
  SuccessResponseWrapper<AuthLinkResponseSuccess> | AuthLinkResponseError
>;
type AuthLinkResponseSuccess = { authorizationUrl: string };
type AuthLinkResponseError = ErrorResponseWrapper;

export type AuthRequest = ExpressPostRequest<{
  code: string;
}>;
export type AuthResponse = Response<
  | SuccessResponseWrapper<AuthResponseSuccess>
  | ErrorResponseWrapper<AuthResponseError>
>;

export type AuthResponseSuccess = {
  userData: UserProfile;
  jwt: string;
  authJourney: AuthJourney;
};

export type AuthResponseError = {
  authJourney: AuthJourney;
};

export type ValidJwtRequest = ExpressPostRequest<{
  token: string;
}>;

export type ValidJwtResponse = Response<
  SuccessResponseWrapper<{ isValidJwt: boolean }>
>;

export type SuccessResponseWrapper<T> = {
  success: true;
  error: false;
  data: T;
};

export type ErrorResponseWrapper<T = null> = {
  success: false;
  error: {
    message: string;
    stack?: string;
  };
  metaData?: T;
};

export type ExpressRequest = Request<{}, {}, {}, {}>;
export type ExpressPostRequest<T = {}> = Request<{}, {}, T, {}>;
