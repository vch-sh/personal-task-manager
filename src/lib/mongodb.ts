import { Collection, MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function connectToDatabase(
  databaseName: string,
  collectionName: string,
): Promise<{ client?: MongoClient; collection?: Collection; error?: string }> {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    return { client, collection };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  }
}
