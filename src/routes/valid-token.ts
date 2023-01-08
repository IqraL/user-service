import { verifyInternalJwt } from "../internalJwt";
import { ValidJwtRequest, ValidJwtResponse } from "./types";

export const validateToken = ({
  req,
  res,
}: {
  req: ValidJwtRequest;
  res: ValidJwtResponse;
}) => {
  const { token } = req.body;

  if (!token) {
    return res.send({
      data: {
        isValidJwt: false,
      },
      error: false,
      success: true,
    });
  }

  const isTokenValid = verifyInternalJwt({ token });

  return res.send({
    data: {
      isValidJwt: isTokenValid,
    },
    error: false,
    success: true,
  });
};
