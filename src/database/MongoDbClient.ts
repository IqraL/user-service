import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

export class MongoDbClient {
  private static uri = process.env.db_uri;
  private static client: MongoClient;

  static getClient() {
    const { client: existingClient } = this;

    if (existingClient) return existingClient;

    this.client = new MongoClient(this.uri, { serverApi: ServerApiVersion.v1 });

    this.client.connect((err) => {
      if (err) {
        console.log("error connecting to database", err);
      }
    });

    return this.client;
  }
}
