import { getOneDbItemWrapper } from "@midnight-moon/mongo-db-layer";
import { ItemTypes, UserData, UserProfile } from "@midnight-moon/shared-types";
import { GetUserByIdRequest } from "../types";

export const getUserById =
  (req: GetUserByIdRequest) => async (): Promise<UserProfile> => {
    const user = await getOneDbItemWrapper<UserData>({
      searchProperties: { email: req.body.email },
      itemType: ItemTypes.User,
    });

    return {
      email: user.email,
      name: user.name,
      displayName: user.displayName,
      locales: user.locales,
      company: user.company,
      itemType: ItemTypes.User,
    };
  };
