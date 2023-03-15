import express from "express";
import { UserGroup } from "@midnight-moon/shared-types";
import { responseWrapper } from "../helpers/utils";
import {
  addUsersToGroup,
  createUserGroup,
  deleteUserGroup,
  getAllUserGroups,
  getUserGroupById,
  removeUsersFromGroup,
  searchUserGroups,
  // searchUserGroups,
} from "./logic";
import {
  AddUsersToGroupRequest,
  CreateUserGroupRequest,
  DeleteUserGroupRequest,
  GetAllUserGroupsRequest,
  GetUserGroupByIdRequest,
  RemoveUsersFromGroupRequest,
  SearchUserGroupsRequest,
  // SearchUserGroupsRequest,
} from "./types";
// import { faker } from "@faker-js/faker";

const userGroupsRouter = express.Router();

userGroupsRouter.post(
  "/get-user-group-by-id",
  async (req: GetUserGroupByIdRequest, res) =>
    await responseWrapper<UserGroup>(getUserGroupById(req), res)
);

userGroupsRouter.post(
  "/get-all-user-groups",
  async (req: GetAllUserGroupsRequest, res) =>
    await responseWrapper<UserGroup[]>(getAllUserGroups(req), res)
);

userGroupsRouter.post(
  "/create-user-group",
  async (req: CreateUserGroupRequest, res) =>
    await responseWrapper<UserGroup>(createUserGroup(req), res)
);

userGroupsRouter.post(
  "/add-users-to-group",
  async (req: AddUsersToGroupRequest, res) =>
    await responseWrapper<UserGroup>(addUsersToGroup(req), res)
);

userGroupsRouter.post(
  "/remove-users-from-group",
  async (req: RemoveUsersFromGroupRequest, res) =>
    await responseWrapper<UserGroup>(removeUsersFromGroup(req), res)
);

userGroupsRouter.post(
  "/delete-user-group",
  async (req: DeleteUserGroupRequest, res) =>
    await responseWrapper<void>(deleteUserGroup(req), res)
);

userGroupsRouter.post(
  "/search-user-groups",
  async (req: SearchUserGroupsRequest, res) =>
    await responseWrapper<UserGroup[]>(searchUserGroups(req), res)
);

export { userGroupsRouter };
