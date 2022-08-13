import {
  GoogleAllTokensResponse,
  GetAllTokensArgs,
  RefreshAccessTokensArgs,
  GoogleRefreshAccessTokenResponse,
} from "./Types";

export const isAllTokensArgs = (object: any): object is GetAllTokensArgs => {
  return "authorizationCode" in object;
};

export const isRefreshAccessTokensArgs = (
  object: any
): object is RefreshAccessTokensArgs => {
  return "refreshToken" in object;
};

export const isGoogleAllTokensResponse = (
  object: any
): object is GoogleAllTokensResponse => {
  return "refresh_token" in object;
};

export const isGoogleRefreshAccessTokenResponse= (
  object: any
): object is GoogleRefreshAccessTokenResponse => {
  return !("refresh_token" in object);
};
