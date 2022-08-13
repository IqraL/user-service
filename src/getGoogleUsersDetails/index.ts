import dotenv from "dotenv";
dotenv.config();

import axios, { AxiosResponse } from "axios";
import { GoogleUsersDetailsResponse } from "./types";
import { extractUserData } from "./helpers";

type getGoogleUsersDetailsParams = {
  access_token: string;
};
export const getGoogleUsersDetails = async ({
  access_token,
}: getGoogleUsersDetailsParams) => {
  try {
    const config = {
      method: "get",
      url: `${process.env.google_auth_user_profile_url}?personFields=emailAddresses%2Cnames%2Clocales&sources=READ_SOURCE_TYPE_PROFILE&access_token=${access_token}`,
    };

    const response: AxiosResponse<GoogleUsersDetailsResponse> = await axios(
      config
    );

    return extractUserData(response.data);
  } catch (error) {
    console.log(error);
    throw new Error(`Error retrieving user details,${error}`);
  }
};
