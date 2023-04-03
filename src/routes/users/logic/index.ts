import { getAllDbItemsWrapper, getOneDbItemWrapper } from "@midnight-moon/mongo-db-layer";
import {
  ItemTypes,
  UserData,
  UserProfile,
  GetAllUserRequest,
  GetUserByIdRequest,
} from "@midnight-moon/shared-types";

const userDataToProfile = (user: UserData): UserProfile => ({
  email: user.email,
  name: user.name,
  displayName: user.displayName,
  locales: user.locales,
  companyId: user.companyId,
  userGroups:user.userGroups,
  isAdmin: user.isAdmin,
  itemType: ItemTypes.User,
});
export const getUserById =
  (req: GetUserByIdRequest) => async (): Promise<UserProfile> => { 
    const user = await getOneDbItemWrapper<UserData>({
      searchProperties: { email: req.body.email },
      itemType: ItemTypes.User,
    });

    return userDataToProfile(user)
  };

export const getAllUsers =
  (req: GetAllUserRequest) => async (): Promise<UserProfile[]> => {
    const users = await getAllDbItemsWrapper<UserData>({
      searchProperties: { companyId: req.body.companyId },
      itemType: ItemTypes.User,
    });

    return users.map(userDataToProfile);
  };

