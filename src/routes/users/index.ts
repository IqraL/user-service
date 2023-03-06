import express from "express";
import { responseWrapper } from "../helpers/utils";
import { getUserById } from "./logic";
import { GetUserByIdRequest, GetUserByIdSuccess } from "./types";

const usersRouter = express.Router();

usersRouter.post(
  "/get-user",
  async (req: GetUserByIdRequest, res) =>
    await responseWrapper<GetUserByIdSuccess>(getUserById(req), res)
);

export { usersRouter };
