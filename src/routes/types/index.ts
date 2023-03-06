import { Request } from "express";

export enum AuthJourney {
  signup = "signup",
  login = "login",
}

export type ExpressRequest = Request<{}, {}, {}, {}>;
export type ExpressPostRequest<T = {}> = Request<{}, {}, T, {}>;
