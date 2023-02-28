import { userGroupDBArgs } from "../config
import {
  addToMongo,
  deleteFromMongo,
  getFromMongo,
} from "../../database/shared";
import { MongoDbClient } from "../../database/MongoDbClient";
import { UserGroup } from "../../ui-types";

export const getUserGroupByIdDbWrapper = async ({ id }: { id: string }) =>
  await getFromMongo<UserGroup>({
    propId: { id },
    ...userGroupDBArgs,
  });

export const getAllUserGroupsDbWrapper = async ({
  company,
}: {
  company: string;
}) => {
  const client = MongoDbClient.getClient();

  console.log("company", company);

  const cursor = await client
    .db(userGroupDBArgs.db)
    .collection(userGroupDBArgs.collection)
    .find<UserGroup>({
      company,
    });

  const mongoDocuments: UserGroup[] = [];

  for await (const mongoDoc of cursor) {
    console.log("mongoDoc", mongoDoc);

    mongoDocuments.push(mongoDoc);
  }

  return mongoDocuments;
};

export const searchUserGroupsDbWrapper = async ({
  userGroupsName,
  companyName,
}: {
  userGroupsName: string;
  companyName: string;
}) => {
  const client = MongoDbClient.getClient();

  const cursor = await client
    .db(userGroupDBArgs.db)
    .collection(userGroupDBArgs.collection)
    .find<UserGroup>({
      $and: [
        { company: companyName },
        { userGroupsName: { $regex: `.*${userGroupsName}*.`, $options: "i" } },
      ],
    });

  const mongoDocuments: UserGroup[] = [];

  for await (const mongoDoc of cursor) {
    mongoDocuments.push(mongoDoc);
  }

  return mongoDocuments;
};

export const createUserGroupDbWrapper = async ({
  userGroup,
}: {
  userGroup: UserGroup;
}) => {
  await addToMongo<UserGroup>({
    obj: userGroup,
    ...userGroupDBArgs,
  });

  const addedUserGroup = getUserGroupByIdDbWrapper({ id: userGroup.id });

  return addedUserGroup;
};

export const deleteUserGroupDbWrapper = async ({ id }: { id: string }) => {
  await deleteFromMongo({
    propId: { id },
    findFunction: getUserGroupByIdDbWrapper,
    ...userGroupDBArgs,
  });
};
