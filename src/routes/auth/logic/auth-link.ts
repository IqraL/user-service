import { google } from "googleapis";
import { AuthLinkResponseSuccess } from "../types";

export const generateAuthenticationLink =
  () => async (): Promise<AuthLinkResponseSuccess> => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.google_auth_client_id,
        process.env.google_auth_client_secret,
        process.env.google_all_token_dummy_redirect
      );

      const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/user.organization.read",
        "https://www.googleapis.com/auth/user.phonenumbers.read",
        // "https://www.googleapis.com/auth/user.addresses.read",
        // "https://www.googleapis.com/auth/user.birthday.read",
      ];

      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
      });

      return { authorizationUrl };
    } catch (error) {
      throw error;
    }
  };
