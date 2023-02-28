import {
  GoogleUsersDetailsResponse,
  GoogleUserData,
} from "./types";
import { valueOrEmpty } from "../helpers.ts/utils";

export const extractUserData = (res: GoogleUsersDetailsResponse): GoogleUserData => {
  if (!res.emailAddresses[0].value) {
    throw new Error(`No email returned from google for user`);
  }

  return {
    email: res.emailAddresses[0].value,
    name: valueOrEmpty(res.names[0]?.unstructuredName),
    displayName: valueOrEmpty(res.names[0]?.displayName),
    locales: valueOrEmpty(res.locales[0]?.value),
  };
};
