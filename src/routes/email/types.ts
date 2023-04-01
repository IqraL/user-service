import { ExpressPostRequest } from "@midnight-moon/shared-types";

export type SendValidationEmail = {
  email: string;
};
export type SendValidationEmailRequest = ExpressPostRequest<SendValidationEmail>;
