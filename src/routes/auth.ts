import { genInternalJWT } from "../internalJwt";

import { getGoogleTokens, isGoogleAllTokensResponse } from "../getGoogleTokens";
import { getGoogleUsersDetails } from "../getGoogleUsersDetails";

import { addUserToDatabase, updateTokens } from "../database/users/addUserToDatabase";
import { AccountProviders, UserData } from "../database/types/users";

import { AuthJourney, AuthRequest, AuthResponse } from "./types";
import { isGoogleEmailVerified } from "./helpers/auth";
import { getUserFromDB } from "../database/users/getUsers";
import { ItemTypes, UserProfile } from "@midnight-moon/shared-types";

export const loginOrSignUp = async ({
  req,
  res,
}: {
  req: AuthRequest;
  res: AuthResponse;
}) => {
  try {
    const { code, company } = req.body;

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
    const allUserData: UserProfile = {
      ...userData,
      company,
      itemType: ItemTypes.Users
    };

    const existingUser = await getUserFromDB({ email: allUserData.email });

    if (existingUser) {
      const internalJWT = genInternalJWT({
        email: existingUser.email,
        displayName: existingUser.displayName,
      });

      await updateTokens({
        email: allUserData.email,
        ...tokens,
        accountProvider: AccountProviders.google,
      });

      return res.send({
        success: true,
        error: null,
        data: {
          userData: allUserData,
          jwt: internalJWT,
          authJourney: AuthJourney.login,
        },
      });
    }

    // if user is deleted from db but was singed in they need to signout of the application/google account
    if (!existingUser && !isGoogleAllTokensResponse(tokens)) {
      throw new Error(
        "You need to sign out first then sign back in as your session needs to close"
      );
    }

    if (!existingUser && isGoogleAllTokensResponse(tokens)) {
      const internalJWT = genInternalJWT({
        email: allUserData.email,
        displayName: allUserData.displayName,
      });

      const insertUserData: UserData = {
        ...allUserData,
        ...tokens,
        accountProvider: AccountProviders.google,
      };

      await addUserToDatabase(insertUserData);

      return res.send({
        success: true,
        error: null,
        data: {
          userData: allUserData,
          jwt: internalJWT,
          authJourney: AuthJourney.signup,
        },
      });
    }

    throw new Error("Could Not create or find user");
  } catch (error) {
    return res.send({
      error: {
        message: `${error.message}`,
        stack: `${error.stack}`,
      },
      success: false,
    });
  }
};
