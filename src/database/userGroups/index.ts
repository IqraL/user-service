// import { userGroupDBArgs } from "../config";
// import {
//   addToMongo,
//   deleteFromMongo,
//   getAllFromMongo,
//   getOneFromMongo,
// } from "../../database/shared";
// import { MongoDbClient } from "../../database/MongoDbClient";
// import { UserGroup } from "utils-and-types-for-development";
// import { SearchProperties } from "../../database/types";

// type P<T> = Partial<T>;
// // type K =  UserGroup
// export const getUserGroupByIdDbWrapper = async (
//   searchProperties: SearchProperties<P<UserGroup>>
// ) =>
//   await getOneFromMongo<P<UserGroup>>({
//     searchProperties,
//     ...userGroupDBArgs,
//   });

// export const getAllUserGroupsDbWrapper = async (
//   searchProperties: SearchProperties<Partial<UserGroup>>
// ) =>
//   await getAllFromMongo<UserGroup>({
//     searchProperties,
//     ...userGroupDBArgs,
//   });

// export const searchUserGroupsDbWrapper = async ({
//   userGroupsName,
//   companyName,
// }: {
//   userGroupsName: string;
//   companyName: string;
// }) => {
//   const client = MongoDbClient.getClient();

//   const cursor = await client
//     .db(userGroupDBArgs.db)
//     .collection(userGroupDBArgs.collection)
//     .find<UserGroup>({
//       $and: [
//         { company: companyName },
//         { userGroupsName: { $regex: `.*${userGroupsName}*.`, $options: "i" } },
//       ],
//     });

//   const mongoDocuments: UserGroup[] = [];

//   for await (const mongoDoc of cursor) {
//     mongoDocuments.push(mongoDoc);
//   }

//   return mongoDocuments;
// };

// export const createUserGroupDbWrapper = async ({
//   userGroup,
// }: {
//   userGroup: UserGroup;
// }) => {
//   await addToMongo<UserGroup>({
//     obj: userGroup,
//     ...userGroupDBArgs,
//   });

//   const addedUserGroup = getUserGroupByIdDbWrapper({ id: userGroup.id });

//   return addedUserGroup;
// };

// export const deleteUserGroupDbWrapper = async <UserGroup>(
//   searchProperties: SearchProperties<UserGroup>
// ) => {
//   await deleteFromMongo({
//     searchProperties: searchProperties,
//     findFunction: getUserGroupByIdDbWrapper,
//     ...userGroupDBArgs,
//   });
// };
