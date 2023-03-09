import { getAllDbItemsWrapper, getOneDbItemWrapper } from "@midnight-moon/mongo-db-layer";
import { ItemTypes, UserData, UserProfile } from "@midnight-moon/shared-types";
import { GetAllUserRequest, GetUserByIdRequest } from "../types";

const userDataToProfile = (user: UserData): UserProfile => ({
  email: user.email,
  name: user.name,
  displayName: user.displayName,
  locales: user.locales,
  company: user.company,
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
      searchProperties: { company: req.body.company },
      itemType: ItemTypes.User,
    });

    return users.map(userDataToProfile);
  };

