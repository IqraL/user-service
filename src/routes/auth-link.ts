import { google } from "googleapis";
import { AuthLinkResponse } from "./types";

export const generateAuthenticationLink = ({
  res,
}: {
  res: AuthLinkResponse;
}) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.google_auth_client_id,
      process.env.google_auth_client_secret,
      process.env.google_all_token_dummy_redirect
    );

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
    });

    return res.send({
      success: true,
      error: false,
      data: { authorizationUrl },
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      error: {
        message: `${error.message}`,
        stack: `${error.stack}`,
      },
    });
  }
};
