import dotenv from "dotenv";

dotenv.config();

export const USERS_DB = process.env.mongodb_database;
export const USERS_COLLECTION = process.env.mongodb_users_collection;
