'use server';

import { connectToDatabase } from '@/lib/mongodb';
import GetTasksResult from '@/types/GetTasksResult';

export async function getTaskCategories() {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('task_db', 'categories');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const taskCategories = await collection.find().toArray();
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
