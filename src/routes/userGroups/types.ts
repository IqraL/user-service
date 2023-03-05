import { Request } from "express";
import { UserGroup } from "utils-and-types-for-development";

type ExpressPostRequest<T> = Request<{}, {}, T, {}>;

export type GetUserGroupById = {
  id: string;
};
export type GetUserGroupByIdRequest = ExpressPostRequest<GetUserGroupById>;

export type GetAllUserGroups = {
  company: string;
};
export type GetAllUserGroupsRequest = ExpressPostRequest<GetAllUserGroups>;

export type CreateUserGroup = { userGroup: UserGroup };
export type CreateUserGroupRequest = ExpressPostRequest<CreateUserGroup>;

export type AddUsersToGroup = { id: string; users: string[] };
export type AddUsersToGroupRequest = ExpressPostRequest<AddUsersToGroup>;

export type RemoveUsersFromGroup = { id: string; users: string[] };
export type RemoveUsersFromGroupRequest = ExpressPostRequest<RemoveUsersFromGroup>;

export type DeleteUserGroup = { id: string };
export type DeleteUserGroupRequest = ExpressPostRequest<DeleteUserGroup>;

export type SearchUserGroups = {
  name: string;
  company: string;
};
export type SearchUserGroupsRequest = ExpressPostRequest<SearchUserGroups>;
