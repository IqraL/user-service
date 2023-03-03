import { MongoDbClient } from "./MongoDbClient";
import {
  AddToMongoParams,
  DeleteFromMongoParams,
  // FindFromMongoArrayParams,
  GetFromMongoParams,
  PullFromMongoParams,
  PushToMongoArrayParams,
  UpdateMongoDocumentParams,
} from "./types";
// import { DBOperation } from "utils-and-types-for-development";

export const getOneFromMongo = async <T>({
  db,
  collection,
  searchProperties,
}: GetFromMongoParams<T>): Promise<T> => {
  const client = MongoDbClient.getClient();
  console.log("searchProperties", searchProperties);

  const mongoDocument = await client
    .db(db)
    .collection(collection)
    .findOne<T>({ ...searchProperties });

  console.log("mongoDocument", mongoDocument);

  if (!mongoDocument) {
    return null;
  }

  return mongoDocument;
};

export const getAllFromMongo = async <T>({
  db,
  collection,
  searchProperties,
}: GetFromMongoParams<T>): Promise<T[]> => {
  const client = MongoDbClient.getClient();
  console.log("searchProperties", searchProperties);

  const mongoDocuments = await client
    .db(db)
    .collection(collection)
    .find<T>({ ...searchProperties });

  const documents = await mongoDocuments.toArray();

  console.log("mongoDocuments", documents);

  return documents;
};

export const addToMongo = async <T>({
  obj,
  db,
  collection,
}: AddToMongoParams<T>) => {
  const client = MongoDbClient.getClient();

  const { acknowledged } = await client
    .db(db)
    .collection(collection)
    .insertOne({
      ...obj,
    });

  console.log("addToMongo", obj);

  if (!acknowledged) {
    throw new Error("Something went wrong with creating the card ");
  }

  console.log("addToMongo acknowledged:", acknowledged, " obj:", obj);
};

export const updateMongoDocument = async <T>({
  searchProperties,
  toUpdateValues,
  arrayProperty,

  db,
  collection,
}: UpdateMongoDocumentParams<T>) => {
  const client = MongoDbClient.getClient();
  const { _id, lastEditedAt, ...updateDetails } = toUpdateValues;

  const { acknowledged, modifiedCount, matchedCount } = await client
    .db(db)
    .collection(collection)
    .updateOne(
      { ...searchProperties },
      {
        $set: { ...(updateDetails ?? {}), ...(arrayProperty ?? {}) },
        $currentDate: { lastEditedAt: true },
      }
    );

  if (!matchedCount) {
    throw new Error(
      `updateMongoDocument: could not find item with searchProperties:
         ${JSON.stringify(searchProperties)} , ${JSON.stringify(
        toUpdateValues
      )}`
    );
  }

  if (!acknowledged || !modifiedCount) {
    throw new Error(
      `updateMongoDocument error, searchProperties:
         ${JSON.stringify(searchProperties)}, ${JSON.stringify(toUpdateValues)}`
    );
  }
};

export const deleteFromMongo = async <T>({
  searchProperties,
  db,
  collection,
  findFunction,
}: DeleteFromMongoParams<T>) => {
  const client = MongoDbClient.getClient();

  const doesDocumentExist = findFunction({ ...searchProperties });

  if (!doesDocumentExist) {
    throw new Error(
      `deletion of item failed as item does not exist: ${JSON.stringify(
        searchProperties
      )}`
    );
  }

  const { acknowledged, deletedCount } = await client
    .db(db)
    .collection(collection)
    .deleteOne({
      ...searchProperties,
    });

  if (!deletedCount || !acknowledged) {
    throw new Error(
      `error ocurred when deleting, ${JSON.stringify(searchProperties)}`
    );
  }
};

export const pushToMongoArray = async <T>({
  searchProperties,
  fieldAndValues,
  db,
  collection,
}: PushToMongoArrayParams<T>) => {
  const client = MongoDbClient.getClient();

  const { acknowledged, modifiedCount, matchedCount } = await client
    .db(db)
    .collection(collection)
    .updateOne(
      { ...searchProperties },
      {
        $push: { ...fieldAndValues },
        $currentDate: { lastEditedAt: true },
      }
    );

  if (!matchedCount) {
    throw new Error(
      `PushToMongoArray: could not find item, ${JSON.stringify(
        searchProperties
      )}`
    );
  }

  if (!acknowledged || !modifiedCount) {
    throw new Error(
      `PushToMongoArray to add push to array in mongoDb, ${JSON.stringify(
        fieldAndValues
      )}`
    );
  }
};

export const pullFromMongo = async <T>({
  searchProperties,
  db,
  collection,
  fieldAndValues,
}: PullFromMongoParams<T>) => {
  const client = MongoDbClient.getClient();

  console.log("fieldAndValues", fieldAndValues);

  const { acknowledged, modifiedCount, matchedCount } = await client
    .db(db)
    .collection(collection)
    .updateOne(
      { ...searchProperties },
      {
        $pull: { ...fieldAndValues },
        $currentDate: { lastEditedAt: true },
      }
    );

  if (!matchedCount) {
    throw new Error(
      `pullFromMongo: could not find item: ${JSON.stringify(fieldAndValues)}`
    );
  }

  if (!acknowledged || !modifiedCount) {
    throw new Error(
      `pullFromMongo: unable to remove asset to db, ${JSON.stringify(
        fieldAndValues
      )}`
    );
  }
};

//updates the mongoDB "Array element"
export const setToMongoArray = async <T>({
  searchProperties,
  fieldAndValues,
  db,
  collection,
}: PushToMongoArrayParams<T>) => {
  const client = MongoDbClient.getClient();

  const { acknowledged, modifiedCount, matchedCount } = await client
    .db(db)
    .collection(collection)
    .updateOne(
      { ...searchProperties },
      {
        $set: { ...fieldAndValues },
        $currentDate: { lastEditedAt: true },
      }
    );

  if (!matchedCount) {
    throw new Error(
      `PushToMongoArray: could not find item, ${JSON.stringify(
        searchProperties
      )}`
    );
  }

  if (!acknowledged || !modifiedCount) {
    throw new Error(
      `PushToMongoArray to add push to array in mongoDb, ${JSON.stringify(
        fieldAndValues
      )}`
    );
  }
};

// export const getFromMongoArray = async <T>({
//   db,
//   collection,
//   fieldAndValues,
// }: FindFromMongoArrayParams): Promise<T[]> => {
//   const client = MongoDbClient.getClient();

//   const cursor = await client
//     .db(db)
//     .collection(collection)
//     .find<T>({ ...fieldAndValues });

//   const mongoDocuments: T[] = [];

//   for await (const mongoDoc of cursor) {
//     mongoDocuments.push(mongoDoc);
//   }

//   return mongoDocuments;
// };
