import { MongoDbClient } from "./MongoDbClient";
import { UserData, UserDataUpdateTokens } from "./types";
import dotenv from "dotenv";

dotenv.config();

const USERS_DB = process.env.mongodb_database;
const USERS_COLLECTION = process.env.mongodb_users_collection;

export const addUserToDatabase = async (userData: UserData) => {
  const client = MongoDbClient.getClient();

  const user = await getUser({ email: userData.email });

  if (user) {
    throw new Error(
      "There is an account with this email, please use a different email"
    );
  }

  const date = new Date();

  await client
    .db(USERS_DB)
    .collection(USERS_COLLECTION)
    .insertOne({
      ...userData,
      lastLoggedIn: new Date(),
      accountCreationDate: date,
    });

  console.log("Added user to database", userData);
};

export const updateTokens = async (userData: UserDataUpdateTokens) => {
  const client = MongoDbClient.getClient();

  const user = await getUser({ email: userData.email });

  if (!user) {
    throw new Error("User does not exist");
  }

  await client
    .db(USERS_DB)
    .collection(USERS_COLLECTION)
    .updateOne(
      { email: userData.email },
      {
        $set: { ...userData, lastLoggedIn: new Date() },
        $currentDate: { lastModified: true },
      }
    );

  console.log("updated user in database", userData);
};

export const getUser = async ({ email }: { email: string }) => {
  const client = MongoDbClient.getClient();

  const user = await client
    .db(USERS_DB)
    .collection(USERS_COLLECTION)
    .findOne({ email });

  return user;
};
