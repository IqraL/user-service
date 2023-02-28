import { Request } from "express";
import { UserGroup } from "../../ui-types";


type ExpressPostRequest<T> = Request<{}, {}, T, {}>;

export type CreateUserGroup = { userGroup: UserGroup };
export type CreateUserGroupRequest = ExpressPostRequest<CreateUserGroup>;

export type SearchUserGroups = {
  userGroupsName: string;
  company: string;
};
export type SearchUserGroupsRequest = ExpressPostRequest<SearchUserGroups>;

export type GetAllUserGroups = {
  company: string;
};
export type GetAllUserGroupsRequest = ExpressPostRequest<GetAllUserGroups>;

export type GetUserGroupById = {
  id: string;
};
export type GetUserGroupByIdRequest = ExpressPostRequest<GetUserGroupById>;
