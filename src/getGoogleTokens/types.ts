export enum GoogleGrantType {
  AuthCode = "authorization_code",
  RefreshCode = "refresh_token",
}
export type GetAllTokensArgs = { authorizationCode: string };
export type RefreshAccessTokensArgs = { refreshToken: string };
export type GetGoogleTokensArgs = GetAllTokensArgs | RefreshAccessTokensArgs;

export type GoogleAllTokensResponse = {
  refresh_token: string;
  access_token: string;
  id_token: string;
  token_type: "Bearer";
  expires_in: number;
  scope: string;
};

export type GoogleRefreshAccessTokenResponse = Omit<GoogleAllTokensResponse, "refresh_token">;

export type GoogleTokensResponse = GoogleAllTokensResponse | GoogleRefreshAccessTokenResponse;
