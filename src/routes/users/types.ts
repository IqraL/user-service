import { GoogleAllTokensResponse } from "../../getGoogleTokens/types";
import { GoogleUserData } from "../../getGoogleUsersDetails/types";
import {
  AccountProviders,
  UserProfile,
  ExpressPostRequest,
} from "@midnight-moon/shared-types";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/* If this type  (UserData) is updated please update in sharedTypes library too */
// export type UserData = GoogleUser & { company: string };

export type UserDataUpdateTokens = { email: string } & Optional<
  GoogleAllTokensResponse,
  "refresh_token"
> & { accountProvider: AccountProviders.google };

export type GoogleUser = GoogleUserData &
  GoogleAllTokensResponse & { accountProvider: AccountProviders.google };
