import { verifyInternalJwt } from "../internalJwt";
import { ValidJwtRequest, ValidJwtResponse } from "./types";

export const validateToken = ({
  req,
  res,
}: {
  req: ValidJwtRequest;
  res: ValidJwtResponse;
}) => {
  const { token } = req.query;

  if (!token) {
    return res.send({
      isValidJwt: false,
    });
  }

  const isTokenValid = verifyInternalJwt({ token });
  return res.send({
    isValidJwt: isTokenValid,
  });
};
