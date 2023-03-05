import {
  AddUsersToGroupRequest,
  CreateUserGroupRequest,
  DeleteUserGroupRequest,
  GetAllUserGroupsRequest,
  GetUserGroupByIdRequest,
  RemoveUsersFromGroupRequest,
  SearchUserGroupsRequest,
} from "../types";
import {
  getOneDbItemWrapper,
  getAllDbItemsWrapper,
  createDbItemWrapper,
  deleteDbItemWrapper,
  searchDbItemWrapper,
  ItemTypes,
  UserGroup,
  pushToArrayDbWrapper,
  pullFromArrayDbWrapper,
} from "utils-and-types-for-development";

export const getUserGroupById =
  (req: GetUserGroupByIdRequest) => async (): Promise<UserGroup> =>
    await getOneDbItemWrapper<UserGroup>({
      searchProperties: { id: req.body.id },
      itemType: ItemTypes.UserGroups,
    });

export const getAllUserGroups =
  (req: GetAllUserGroupsRequest) => async (): Promise<UserGroup[]> => {
    return await getAllDbItemsWrapper<UserGroup>({
      searchProperties: { company: req.body.company },
      itemType: ItemTypes.UserGroups,
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
      itemType: ItemTypes.UserGroups,
    });
  };

export const removeUsersFromGroup =
  (req: RemoveUsersFromGroupRequest) => async (): Promise<UserGroup> => {
    return await pullFromArrayDbWrapper<UserGroup>({
      searchProperties: { id: req.body.id },
      fieldAndValues: { users: req.body.users },
      itemId: { id: req.body.id },
      itemType: ItemTypes.UserGroups,
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
    console.log({
      name: req.body.name,
      company: req.body.company,
    });
    return await searchDbItemWrapper<UserGroup>({
      searchPropertiesAndValues: [
        {
          name: req.body.name,
        },
        {
          company: req.body.company,
        },
      ],
      regexProperties: ["name"],
      searchType: "and",
      itemType: ItemTypes.UserGroups,
    });
  };
