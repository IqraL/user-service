import {
  AddUsersToGroupRequest,
  CreateUserGroupRequest,
  DeleteUserGroupRequest,
  GetAllUserGroupsRequest,
  GetUserGroupByIdRequest,
  RemoveUsersFromGroupRequest,
  SearchUserGroupsRequest,
} from "../types";
import { ItemTypes, UserGroup } from "@midnight-moon/shared-types";
import {
  getOneDbItemWrapper,
  getAllDbItemsWrapper,
  createDbItemWrapper,
  deleteDbItemWrapper,
  searchDbItemWrapper,
  pushToArrayDbWrapper,
  pullFromArrayDbWrapper,
} from "@midnight-moon/mongo-db-layer";

export const getUserGroupById =
  (req: GetUserGroupByIdRequest) => async (): Promise<UserGroup> =>
    await getOneDbItemWrapper<UserGroup>({
      searchProperties: { id: req.body.id },
      itemType: ItemTypes.UserGroup,
    });

export const getAllUserGroups =
  (req: GetAllUserGroupsRequest) => async (): Promise<UserGroup[]> => {
    return await getAllDbItemsWrapper<UserGroup>({
      searchProperties: { company: req.body.company },
      itemType: ItemTypes.UserGroup,
    });
  };

export const createUserGroup =
  (req: CreateUserGroupRequest) => async (): Promise<UserGroup> => {
    return await createDbItemWrapper<UserGroup>({
      item: req.body.userGroup,
    });
  };

export const addUsersToGroup =
  (req: AddUsersToGroupRequest) => async (): Promise<UserGroup> => {
    return await pushToArrayDbWrapper<UserGroup>({
      searchProperties: { id: req.body.id },
      fieldAndValues: { users: req.body.users },
      itemId: { id: req.body.id },
      itemType: ItemTypes.UserGroup,
    });
  };

export const removeUsersFromGroup =
  (req: RemoveUsersFromGroupRequest) => async (): Promise<UserGroup> => {
    return await pullFromArrayDbWrapper<UserGroup>({
      searchProperties: { id: req.body.id },
      fieldAndValues: { users: req.body.users },
      itemId: { id: req.body.id },
      itemType: ItemTypes.UserGroup,
    });
  };

export const deleteUserGroup =
  (req: DeleteUserGroupRequest) => async (): Promise<void> => {
    return await deleteDbItemWrapper({
      itemId: { id: req.body.id },
    });
  };

// pushToArrayDbWrapper;
export const searchUserGroups =
  (req: SearchUserGroupsRequest) => async (): Promise<UserGroup[]> => {
    return await searchDbItemWrapper<UserGroup>({
      searchPropertiesAndValues: [{ ...req.body.searchPropertiesAndValues }],
      regexProperties: [...req.body.regexProperties],
      searchType: req.body.searchType,
      itemType: ItemTypes.UserGroup,
    });
  };
