import jwt from "jsonwebtoken";

export const isGoogleEmailVerified = ({ googleIdToken }: genUserDataArgs) => {
  try {
    const googleUserData = decodeGoogleIdToken(googleIdToken);
    const { email_verified } = googleUserData;
    return email_verified;
  } catch (error) {
    throw new Error(`Error checking if gmail is verified  ${error}`);
  }
};

const decodeGoogleIdToken = (token: string) => {
  const userData = jwt.decode(token);
  if (isGoogleIDTokenUser(userData)) {
    return userData;
  } else {
    throw new Error(`failed to decode GoogleIdToken for ${token}`);
  }
};

export const isGoogleIDTokenUser = (
  userData: any
): userData is GoogleIDTokenUser => "email" in userData && "sub" in userData;

export type GoogleIDTokenUser = {
    email: string;
    name?: string;
    given_name: string;
    family_name: string;
    locale: string;
    picture: string;
    sub: string;
  
    iss: string;
    azp: string;
    aud: string;
    email_verified: boolean;
    at_hash: string;
    iat: number;
    exp: number;
  };
  
  type genUserDataArgs = {
    googleIdToken: string;
  };
  
