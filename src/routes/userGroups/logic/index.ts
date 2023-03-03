// import {
//   searchUserGroupsDbWrapper,
//   createUserGroupDbWrapper,
//   getAllUserGroupsDbWrapper,
//   getUserGroupByIdDbWrapper,
// } from "../../../database/userGroups";

import {
  CreateUserGroupRequest,
  DeleteUserGroupRequest,
  GetAllUserGroupsRequest,
  GetUserGroupByIdRequest,
  // SearchUserGroupsRequest,
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
} from "utils-and-types-for-development";
import * as allTypes from "utils-and-types-for-development";

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

export const deleteUserGroup =
  (req: DeleteUserGroupRequest) => async (): Promise<void> => {
    return await deleteDbItemWrapper({
      itemId: { id: req.body.id },
    });
  };

export const addUsersToGroup = (req: any) => async (): Promise<UserGroup> => {
  console.log("req", req.body);
    console.log("ItemTypes", ItemTypes);
        console.log("getOneDbItemWrapper", ItemTypes);


  const currentUserGroup = await getOneDbItemWrapper<UserGroup>({
    searchProperties: { id: req.body.id },
    itemType: ItemTypes.UserGroups,
  });

    console.log("currentUserGroup", currentUserGroup);


  return await pushToArrayDbWrapper<UserGroup>({
    searchProperties: { id: req.body.id },
    fieldAndValues: { users: [...currentUserGroup.users, "newUser"] },
    itemId: { id: req.body.id },
    itemType: ItemTypes.UserGroups,
  });
};

// pushToArrayDbWrapper;
export const searchUserGroups =
  (req: any) => async (): Promise<UserGroup[]> => {
    return await searchDbItemWrapper<UserGroup>({
      searchPropertiesAndValues: [
        {
          name: req.body.userGroupsName,
          company: req.body.company,
        },
      ],
      regexProperties: ["name"],
      searchType: "and",
      itemType: ItemTypes.UserGroups,
    });
  };
