import {
  DatabaseOperationsParams,
  RegexProperties,
  UserGroup,
} from "@midnight-moon/shared-types";
import { ExpressPostRequest } from "../helpers/types";


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
export type RemoveUsersFromGroupRequest =
  ExpressPostRequest<RemoveUsersFromGroup>;

export type DeleteUserGroup = { id: string };
export type DeleteUserGroupRequest = ExpressPostRequest<DeleteUserGroup>;

//TDDO: make sure user only get results for company
export type SearchUserGroups = {
  searchPropertiesAndValues: DatabaseOperationsParams.SearchProperties<UserGroup>;
  regexProperties: RegexProperties<UserGroup>;
  searchType: "and" | "or";
};
export type SearchUserGroupsRequest = ExpressPostRequest<SearchUserGroups>;
