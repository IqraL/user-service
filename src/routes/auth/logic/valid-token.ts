import { verifyInternalJwt } from "../../../internalJwt";
import {
  ValidJwtRequest,
  ValidJwtSuccess,
} from "@midnight-moon/shared-types";
export const validateToken =
  (req: ValidJwtRequest) => async (): Promise<ValidJwtSuccess> => {
    const { token } = req.body;

    if (!token) {
      return {
        isValidJwt: false,
      };
    }

    const isTokenValid = verifyInternalJwt({ token });

    return {
      isValidJwt: isTokenValid,
    };
  };
  