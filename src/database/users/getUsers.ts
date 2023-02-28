import { USERS_COLLECTION, USERS_DB } from "../config";
import { MongoDbClient } from "../MongoDbClient";
import { UserData } from "../types/users";

export const getUserFromDB = async ({ email }: { email: string }) => {
  const client = MongoDbClient.getClient();

  const user = await client
    .db(USERS_DB)
    .collection(USERS_COLLECTION)
    .findOne({ email });

  return user;
};

export const getAllUsersFromDB = async ({ company }: { company: string }) => {
  const client = MongoDbClient.getClient();

  console.log("company", company);
  
  const usersCursor = await client
    .db(USERS_DB)
    .collection(USERS_COLLECTION)
    .find<UserData>({ company });

  const users = await usersCursor.toArray();

  return users;
};
