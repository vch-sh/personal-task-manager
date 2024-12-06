'use server';

import { connectToDatabase } from '@/lib/mongodb';

export async function getTaskCategories(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('task_db', 'categories');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const taskCategories = await collection
      .find({ $or: [{ name: 'all' }, { userId: id }] })
      .toArray();
    return JSON.parse(JSON.stringify(taskCategories)) || [];
  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
          error.message ||
          'Failed to fetch task categories. Please, try again later.',
      };
    }
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}
