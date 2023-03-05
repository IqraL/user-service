import express from "express";
import { UserGroup } from "../../ui-types";
import { responseWrapper } from "../utils";
import {
  addUsersToGroup,
  createUserGroup,
  getAllUserGroups,
  getUserGroupById,
  // searchUserGroups,
} from "./logic";
import {
  AddUsersToGroupRequest,
  CreateUserGroupRequest,
  GetAllUserGroupsRequest,
  GetUserGroupByIdRequest,
  // SearchUserGroupsRequest,
} from "./types";
// import { faker } from "@faker-js/faker";

const userGroupsRouter = express.Router();

userGroupsRouter.post(
  "/getUserGroupById",
  async (req: GetUserGroupByIdRequest, res) =>
    await responseWrapper<UserGroup>(getUserGroupById(req), res)
);

userGroupsRouter.post(
  "/getAllUserGroups",
  async (req: GetAllUserGroupsRequest, res) =>
    await responseWrapper<UserGroup[]>(getAllUserGroups(req), res)
);

userGroupsRouter.post(
  "/createUserGroup",
  async (req: CreateUserGroupRequest, res) =>
    await responseWrapper<UserGroup>(createUserGroup(req), res)
);


userGroupsRouter.post(
  "/addUsersToGroup",
  async (req: AddUsersToGroupRequest, res) =>
    await responseWrapper<UserGroup>(addUsersToGroup(req), res)
);






// userGroupsRouter.post(
//   "/searchUserGroups",
//   async (req: SearchUserGroupsRequest, res) =>
//     await responseWrapper<UserGroup[]>(searchUserGroups(req), res)
// );

export { userGroupsRouter };
