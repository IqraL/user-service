import { UserProfile } from "../ui-types";
import { getAllUsersFromDB } from "../database/getUsers";
import { GetAllUsersRequest, GetAllUsersResponse } from "./types";

export const getAllUsers = async ({
  req,
  res,
}: {
  req: GetAllUsersRequest;
  res: GetAllUsersResponse;
}) => {
  try {
    const users = await getAllUsersFromDB({ company: req.body.company });

    const usersProfiles: UserProfile[] = users.map((user) => ({
      email: user.email,
      name: user.name,
      displayName: user.displayName,
      locales: user.locales,
      company: user.company,
    }));

    res.send({
      success: true,
      error: false,
      data: {
        usersProfiles: usersProfiles,
      },
    });
  } catch (error) {
    res.send({
      success: false,
      error: {
        message: error.message,
        stack: `${error.stack}`,
      },
    });
  }
};
