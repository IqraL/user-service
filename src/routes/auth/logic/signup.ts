// import { genInternalJWT } from "../../../internalJwt";

// import {
//   getGoogleTokens,
//   isGoogleAllTokensResponse,
// } from "../../../getGoogleTokens";
// import { getGoogleUsersDetails } from "../../../getGoogleUsersDetails";

// import { AuthRequest, AuthResponseSuccess } from "../types";
// import { isGoogleEmailVerified } from "../../helpers/auth";
// import {
//   ItemTypes,
//   CompanyDetails,
//   UserProfile,
//   UserData,
//   AccountProviders,
// } from "@midnight-moon/shared-types";
// import { AuthJourney } from "../../helpers/types";
// import {
//   createDbItemWrapper,
//   getOneDbItemWrapper,
// } from "@midnight-moon/mongo-db-layer";

// function getDomainFromEmail(email: string): string {
//   const atIndex = email.indexOf("@");
//   if (atIndex === -1) {
//     throw new Error("Invalid email address");
//   }
//   return email.substring(atIndex + 1);
// }

// export const signup =
//   (req: AuthRequest) => async (): Promise<AuthResponseSuccess> => {
//     try {
//       const { code, division } = req.body;

//       const tokens = await getGoogleTokens({
//         authorizationCode: code,
//       });

//       const { access_token, id_token } = tokens;

//       const googleEmailVerified = isGoogleEmailVerified({
//         googleIdToken: id_token,
//       });

//       if (!googleEmailVerified) {
//         throw new Error(
//           "You can not sign up with google as your google email is not verified with google"
//         );
//       }

//       const userData = await getGoogleUsersDetails({ access_token });
//       const domain = getDomainFromEmail(userData.email);

//       const doesDomainExist = await getOneDbItemWrapper<CompanyDetails>({
//         searchProperties: {
//           domain,
//         },
//         itemType: ItemTypes.CompanyDetails,
//       });

//       if (!doesDomainExist) {
//         throw new Error(
//           "Looks like you're organization is not using this service, sign up for organization"
//         );
//       }
//       const doesDivisionExist = await getOneDbItemWrapper<CompanyDetails>({
//         searchProperties: {
//           domain,
//           division,
//         },
//         itemType: ItemTypes.CompanyDetails,
//       });

//       if (!doesDivisionExist) {
//         throw new Error(
//           "Looks like you're organization is using this service, but you're division is not, sign up for division"
//         );
//       }

//       const existingUser = await getOneDbItemWrapper<CompanyDetails>({
//         searchProperties: { users: [userData.email] },
//         itemType: ItemTypes.CompanyDetails,
//       });

//       if (!existingUser) {
//         throw new Error("Please ask you're admin to add you.");
//       }

//       if (existingUser) {
//         throw new Error(
//           "Looks like you're account exist, please use the login instead of signup"
//         );
//       }
//     } catch (error) {
//       //@ts-ignore
//       throw new Error(error);
//     }
//   };

// // const signupNewCompany = async () => {
// //   try {
// //     const { code, domain, division, admins } = req.body;

// //     const companyName = `${domain}-${division}`;

// //     const tokens = await getGoogleTokens({
// //       authorizationCode: code,
// //     });

// //     const { access_token, id_token } = tokens;

// //     const googleEmailVerified = isGoogleEmailVerified({
// //       googleIdToken: id_token,
// //     });

// //     if (!googleEmailVerified) {
// //       throw new Error(
// //         "You can not sign up with google as your google email is not verified with google"
// //       );
// //     }

// //     const userData = await getGoogleUsersDetails({ access_token });

// //     await createDbItemWrapper<CompanyDetails>({
// //       item: {
// //         domain,
// //         division,
// //         company: companyName,
// //         users: [userData.email],
// //         admins: [userData.email],
// //         itemType: ItemTypes.CompanyDetails,
// //       },
// //     });

// //     if (!isGoogleAllTokensResponse(tokens)) {
// //       throw new Error(
// //         "You need to sign out first then sign back in as your session needs to close"
// //       );
// //     }

// //     if (isGoogleAllTokensResponse(tokens)) {
// //       const allUserData: UserProfile = {
// //         ...userData,
// //         company: companyName,
// //         userGroups: [],
// //         itemType: ItemTypes.User,
// //       };

// //       const internalJWT = genInternalJWT({
// //         email: allUserData.email,
// //         displayName: allUserData.displayName,
// //       });

// //       const insertUserData: UserData = {
// //         ...allUserData,
// //         ...tokens,
// //         accountProvider: AccountProviders.google,
// //         lastLoggedIn: new Date(),
// //         accountCreationDate: new Date(),
// //       };

// //       await createDbItemWrapper({
// //         item: insertUserData,
// //       });

// //       return {
// //         userData: allUserData,
// //         jwt: internalJWT,
// //         authJourney: AuthJourney.signup,
// //       };
// //     }
// //   } catch (error) {
// //     console.log("error", error);
// //   }
// // };

// // const doesDomainExist = ({ email }) => {};
