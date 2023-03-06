import { genInternalJWT } from "../../../internalJwt";

import {
  getGoogleTokens,
  isGoogleAllTokensResponse,
} from "../../../getGoogleTokens";
import { getGoogleUsersDetails } from "../../../getGoogleUsersDetails";

// import {
//   addUserToDatabase,
//   updateTokens,
// } from "../../../database/users/addUserToDatabase";

import { AuthRequest, AuthResponseSuccess } from "../types";
import { isGoogleEmailVerified } from "../../helpers/auth";
import {
  ItemTypes,
  UserProfile,
  AccountProviders,
  UserData,
  // AuthJourney,
} from "@midnight-moon/shared-types";
import { AuthJourney } from "../../helpers/types";
import { createDbItemWrapper, getOneDbItemWrapper, updateDbItemWrapper } from "@midnight-moon/mongo-db-layer";
// import { UserDataUpdateTokens } from "../..//users/types";

// export const updateTokens = async (userData: UserDataUpdateTokens) => {
//   const client = MongoDbClient.getClient();

//   const user = await getUserFromDB({ email: userData.email });

//   if (!user) {
//     throw new Error("User does not exist");
//   }

//   await client
//     .db(USERS_DB)
//     .collection(USERS_COLLECTION)
//     .updateOne(
//       { email: userData.email },
//       {
//         $set: { ...userData, lastLoggedIn: new Date() },
//         $currentDate: { lastModified: true },
//       }
//     );

//   console.log("updated user in database", userData);
// };

export const loginOrSignUp =
  (req: AuthRequest) => async (): Promise<AuthResponseSuccess> => {
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
        itemType: ItemTypes.User,
      };

      const existingUser = await getOneDbItemWrapper<UserData>({
        searchProperties: { email: allUserData.email },
        itemType: ItemTypes.User,
      });

      if (existingUser) {
        const internalJWT = genInternalJWT({
          email: existingUser.email,
          displayName: existingUser.displayName,
        });

        await updateDbItemWrapper({
          itemId: { email: allUserData.email },
          item: { ...tokens },
        });
        // await updateTokens({
        //   email: allUserData.email,
        //   ...tokens,
        //   accountProvider: AccountProviders.google,
        // });

        return {
          userData: allUserData,
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

      if (!existingUser && isGoogleAllTokensResponse(tokens)) {
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
        // await addUserToDatabase(insertUserData);

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
