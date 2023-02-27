import { GoogleAllTokensResponse } from "../getGoogleTokens/types";
import { GoogleUserData } from "../getGoogleUsersDetails/types";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type UserData = GoogleUser & {company: string}

export type UserDataUpdateTokens = { email: string } & Optional<
  GoogleAllTokensResponse,
  "refresh_token"
> & { accountProvider: AccountProviders.google } 

export type GoogleUser = GoogleUserData &
  GoogleAllTokensResponse & { accountProvider: AccountProviders.google };

export enum AccountProviders {
  google = "google",
}
