import { UserGroup } from "../../../ui-types";
import {
  searchUserGroupsDbWrapper,
  createUserGroupDbWrapper,
  getAllUserGroupsDbWrapper,
  getUserGroupByIdDbWrapper,
} from "../../../database/usersToRefactor";

import {
  CreateUserGroupRequest,
  GetAllUserGroupsRequest,
  GetUserGroupByIdRequest,
  SearchUserGroupsRequest,
} from "../types";

export const getUserGroupById =
  (req: GetUserGroupByIdRequest) => async (): Promise<UserGroup> =>
    await getUserGroupByIdDbWrapper({ id: req.body.id });

export const getAllUserGroups =
  (req: GetAllUserGroupsRequest) => async (): Promise<UserGroup[]> => {
    return await getAllUserGroupsDbWrapper({
      company: req.body.company,
    });
  };

export const searchUserGroups =
  (req: SearchUserGroupsRequest) => async (): Promise<UserGroup[]> => {
    return await searchUserGroupsDbWrapper({
      userGroupsName: req.body.userGroupsName,
      companyName: req.body.company,
    });
  };

export const createUserGroup =
  (req: CreateUserGroupRequest) => async (): Promise<UserGroup> => {
    return await createUserGroupDbWrapper({ userGroup: req.body.userGroup });
  };
