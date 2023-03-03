import { WithId } from "mongodb";

export type MongoDBDocument<T> = WithId<T>;

export type CommonMongoParams = {
  db: string;
  collection: string;
};
export type MongoArrayModificationFindTypes = any;
export type SearchProperties<T> = { [K in keyof T]?: T[K] };

export type GetFromMongoParams<T> = {
  searchProperties: SearchProperties<T>;
} & CommonMongoParams;

export type AddToMongoParams<T> = {
  obj: T;
} & CommonMongoParams;

export type UpdateMongoDocumentParams<T, K = any> = {
  searchProperties: SearchProperties<T>
  toUpdateValues?: Partial<T & { lastEditedAt?: any; _id?: any }>;
  arrayProperty?: { [key in string]: Partial<K> };
} & CommonMongoParams;

export type DeleteFromMongoParams<T> = {
  searchProperties: SearchProperties<T>
  findFunction:  (searchProperties: SearchProperties<T>) => Promise<T>;
} & CommonMongoParams;

export type PushToMongoArrayParams<T> = {
  searchProperties: SearchProperties<T>
  fieldAndValues: { [key in string]: any };
} & CommonMongoParams;

export type PullFromMongoParams<T> = {
  searchProperties: SearchProperties<T>
  fieldAndValues: { [key in string]: any };
} & CommonMongoParams;

// export type FindFromMongoArrayParams = {
//   fieldAndValues: MongoArrayModificationFindTypes;
// } & CommonMongoParams;

export type DateRangeSearch = { fromDate?: Date; toDate?: Date };
