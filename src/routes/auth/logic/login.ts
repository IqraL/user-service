import { genInternalJWT } from "../../../internalJwt";

import {
  getGoogleTokens,
  isGoogleAllTokensResponse,
} from "../../../getGoogleTokens";
import { getGoogleUsersDetails } from "../../../getGoogleUsersDetails";

import { isGoogleEmailVerified } from "../../helpers/auth";
import {
  ItemTypes,
  UserProfile,
  AccountProviders,
  UserData,
  CompanyDetails,
  AuthRequest,
  AuthResponseSuccess,
} from "@midnight-moon/shared-types";
import { AuthJourney } from "../../helpers/types";
import {
  createDbItemWrapper,
  getOneDbItemWrapper,
  updateDbItemWrapper,
} from "@midnight-moon/mongo-db-layer";

export const login =
  (req: AuthRequest) => async (): Promise<AuthResponseSuccess> => {
    try {
      const { code } = req.body;

      const tokens = await getGoogleTokens({
        authorizationCode: code,
      });

      const { access_token, id_token } = tokens;

      const googleEmailVerified = isGoogleEmailVerified({
        googleIdToken: id_token,
      });

      if (!googleEmailVerified) {
        throw new Error(
          "You can not sign up with google as your google email is not verified with google"
        );
      }

      const userData = await getGoogleUsersDetails({ access_token });

      const existingUser = await getOneDbItemWrapper<UserData>({
        searchProperties: { email: userData.email },
        itemType: ItemTypes.User,
      });

      const companyDetails = await getOneDbItemWrapper<CompanyDetails>({
        searchProperties: {
          users: [userData.email],
        },
        itemType: ItemTypes.User,
      });

      const firstLogin = companyDetails && !existingUser;

      if (!firstLogin && !existingUser) {
        throw new Error(
          "You need to sign up you're company to use the app, OR If you're company is already using us ask an admin to add you to the list of users"
        );
      }
      
      if (existingUser) {
        const internalJWT = genInternalJWT({
          email: existingUser.email,
          displayName: existingUser.displayName,
        });

        await updateDbItemWrapper({
          itemId: { email: existingUser.email },
          item: { ...tokens },
        });

        return {
          userData: existingUser,
          jwt: internalJWT,
          authJourney: AuthJourney.login,
        };
      }

      // if user is deleted from db but was singed in they need to signout of the application/google account
      if (!existingUser && !isGoogleAllTokensResponse(tokens)) {
        throw new Error(
          "You need to sign out first then sign back in as your session needs to close"
        );
      }

      if (!existingUser && isGoogleAllTokensResponse(tokens) && firstLogin) {
        const isAdmin = companyDetails.admins.find(
          (admin) => admin === userData.email
        );

        const allUserData: UserProfile = {
          ...userData,
          companyId: companyDetails.companyId,
          isAdmin: !!isAdmin,
          userGroups: [],
          itemType: ItemTypes.User,
        };

        const internalJWT = genInternalJWT({
          email: allUserData.email,
          displayName: allUserData.displayName,
        });

        const insertUserData: UserData = {
          ...allUserData,
          ...tokens,
          accountProvider: AccountProviders.google,
          lastLoggedIn: new Date(),
          accountCreationDate: new Date(),
        };

        await createDbItemWrapper({
          item: insertUserData,
        });

        return {
          userData: allUserData,
          jwt: internalJWT,
          authJourney: AuthJourney.signup,
        };
      }

      throw new Error("Could Not create or find user");
    } catch (error) {
      //@ts-ignore
      throw new Error(error);
    }
  };
