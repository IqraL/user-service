import { genInternalJWT } from "../../../internalJwt";

import {
  getGoogleTokens,
  isGoogleAllTokensResponse,
} from "../../../getGoogleTokens";
import { getGoogleUsersDetails } from "../../../getGoogleUsersDetails";

import { AuthRequest, AuthResponseSuccess } from "../types";
import { isGoogleEmailVerified } from "../../helpers/auth";
import {
  ItemTypes,
  UserProfile,
  AccountProviders,
  UserData,
  DomainTypes
} from "@midnight-moon/shared-types";
import { AuthJourney } from "../../helpers/types";
import {
  createDbItemWrapper,
  getOneDbItemWrapper,
  updateDbItemWrapper,
} from "@midnight-moon/mongo-db-layer";

// export const signup =
//   (req: AuthRequest) => async (): Promise<AuthResponseSuccess> => {
//     try {
//       const { code, dommain, company, division } = req.body;

//     } catch (error) {
//       //@ts-ignore
//       throw new Error(error);
//     }
//   };
