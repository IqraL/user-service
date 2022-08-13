import { GET_GOOGLE_TOKENS_REQ_STATIC_BODY } from "./consts";
import { GetGoogleTokensArgs, GoogleGrantType } from "./types";
import { isAllTokensArgs, isRefreshAccessTokensArgs } from "./utils";

export const getGoogleTokenReqBody = (args: GetGoogleTokensArgs) => {
  let key, value, grant_type: GoogleGrantType;
  const isAllTokenReq = isAllTokensArgs(args);
  const isRefreshAccessTokensReq = isRefreshAccessTokensArgs(args);

  if (isAllTokenReq) {
    key = "code";
    value = args.authorizationCode;
    grant_type = GoogleGrantType.AuthCode;
  } else {
    key = "refresh_token";
    value = args.refreshToken;
    grant_type = GoogleGrantType.RefreshCode;
  }

  const reqBody = { [`${key}`]: value, grant_type };
  const extraBody = isAllTokenReq
    ? { redirect_uri: process.env.google_all_token_dummy_redirect }
    : {};
  return { ...reqBody, ...extraBody, ...GET_GOOGLE_TOKENS_REQ_STATIC_BODY };
};
