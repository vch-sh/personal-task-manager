import { Collection, MongoClient } from 'mongodb';

let cachedClient: MongoClient | null = null;

export async function connectToDatabase(
  collectionName: string,
): Promise<{ client?: MongoClient; collection?: Collection; error?: string }> {
  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(process.env.MONGODB_URI || '');
      await cachedClient.connect();
      console.log('MongoDB connected');
    }

    const collection = cachedClient
      .db(process.env.MONGODB_DB)
      .collection(collectionName);

    return { client: cachedClient, collection };
  } catch (error) {
    console.error('Error while connecting to MongoDB:', error);
    return {
      error:
        error instanceof Error
          ? error.message ||
            'Failed to fetch a category. Please, try again later.'
          : 'Unknown error occurred while connecting to the database',
    };
  }
}

process.on('SIGINT', async () => {
  if (cachedClient) {
    await cachedClient.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});
