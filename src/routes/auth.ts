import { genInternalJWT } from "../internalJwt";

import { getGoogleTokens, isGoogleAllTokensResponse } from "../getGoogleTokens";
import { getGoogleUsersDetails } from "../getGoogleUsersDetails";

import {
  addUserToDatabase,
  updateTokens,
} from "../database/addUserToDatabase";
import { AccountProviders, UserData } from "../database/types";

import { AuthJourney, AuthRequest, AuthResponse } from "./types";
import { isGoogleEmailVerified } from "./helpers/auth";
import { getUserFromDB } from "../database/getUsers";

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
    console.log("userData", userData);

    const existingUser = await getUserFromDB({ email: userData.email });
    console.log("existingUser", existingUser);

    if (existingUser) {
      const internalJWT = genInternalJWT({
        email: existingUser.email,
        displayName: existingUser.displayName,
      });
      console.log("internalJWT", internalJWT);

      await updateTokens({
        email: userData.email,
        ...tokens,
        accountProvider: AccountProviders.google,
      });

      return res.send({
        success: true,
        error: null,
        data: { userData, jwt: internalJWT, authJourney: AuthJourney.login },
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
        email: userData.email,
        displayName: userData.displayName,
      });

      const insertUserData: UserData = {
        ...userData,
        ...tokens,
        company,
        accountProvider: AccountProviders.google,
      };

      await addUserToDatabase(insertUserData);

      return res.send({
        success: true,
        error: null,
        data: { userData, jwt: internalJWT, authJourney: AuthJourney.signup },
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
