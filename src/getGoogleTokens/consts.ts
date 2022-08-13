import dotenv from "dotenv";
dotenv.config();

export const GET_GOOGLE_TOKENS_REQ_STATIC_BODY = {
  client_id: process.env.google_auth_client_id,
  client_secret: process.env.google_auth_client_secret,
};

export const GOOGLE_TOKENS_REQ_CONFIG = {
  method: "post",
  url: `${process.env.google_auth_token_uri}`,
  headers: {
    "Content-Type": "application/json",
  },
};
