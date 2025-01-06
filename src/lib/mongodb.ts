import { Collection, MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function connectToDatabase(
  collectionName: string,
): Promise<{ client?: MongoClient; collection?: Collection; error?: string }> {
  try {
    await client.connect();
    const collection = client
      .db(process.env.MONGODB_DB)
      .collection(collectionName);

    return { client, collection };
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : {
          error: 'Unknown error occurred while connecting to the database',
        };
  }
}
