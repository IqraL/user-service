import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import { GetGoogleTokensArgs, GoogleTokensResponse } from "./types";
import { GOOGLE_TOKENS_REQ_CONFIG } from "./consts";
import { getGoogleTokenReqBody } from "./helpers";

dotenv.config();

export const getGoogleTokens = async (args: GetGoogleTokensArgs) => {
  try {
    const reqBody = getGoogleTokenReqBody(args);

    const tokenResponse: AxiosResponse<GoogleTokensResponse> = await axios({
      ...GOOGLE_TOKENS_REQ_CONFIG,
      data: JSON.stringify({
        ...reqBody,
      }),
    });

    const { data } = tokenResponse;

    return data;
  } catch (error) {
    throw new Error(`Error retrieving  refresh_token  & access_token`);
  }
};

export { isGoogleAllTokensResponse } from "./utils";
