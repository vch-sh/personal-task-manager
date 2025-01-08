'use server';

import { connectToDatabase } from '@/lib/mongodb';

export async function getSettings(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('settings');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const userSettings = await collection.findOne({ userId: id });
    return JSON.parse(JSON.stringify(userSettings));
  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
          error.message || 'Failed to fetch settings. Please, try again later.',
      };
    }
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}
