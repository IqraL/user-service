import jwt from "jsonwebtoken";

export const genInternalJWT = ({
  email,
  displayName,
}: {
  email: string;
  displayName: string;
}) => {
  try {
    return jwt.sign(
      {
        data: { email, displayName },
        exp: Math.floor(Date.now() / 1000) + numberOfDays(30),
      },
      //@ts-ignore
      process.env.jwt_secret_key
      //{ expiresIn: "1m" }
    );
  } catch (error) {
    throw new Error(
      `Error generating internal JWT userData: ${email} error: ${error}`
    );
  }
};

export const verifyInternalJwt = ({ token }: { token: string }) => {
  try {
    //@ts-ignore
    jwt.verify(token, process.env.jwt_secret_key);
    return true;
  } catch (error) {
    return false;
  }
};

const numberOfDays = (days: number) =>
  Math.floor(Date.now() / 1000) + 60 * 60 * 24 * days;
