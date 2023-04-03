import express from "express";
import { responseWrapper } from "../helpers/utils";
import { getAllUsers, getUserById } from "./logic";
import { GetAllUserRequest, GetAllUserSuccess, GetUserByIdRequest, GetUserByIdSuccess } from "@midnight-moon/shared-types";

const usersRouter = express.Router();

usersRouter.post(
  "/get-user",
  async (req: GetUserByIdRequest, res) =>
    await responseWrapper<GetUserByIdSuccess>(getUserById(req), res)
);


usersRouter.post(
  "/get-all-users",
  async (req: GetAllUserRequest, res) =>
    await responseWrapper<GetAllUserSuccess>(getAllUsers(req), res)
);
export { usersRouter };