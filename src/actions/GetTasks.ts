'use server';

import { connectToDatabase } from '@/lib/mongodb';
import GetTasksResult from '@/types/GetTasksResult';

export async function getTasks(id: string): Promise<GetTasksResult> {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('task_db', 'tasks');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const userTasks = await collection.find({ userId: id }).toArray();
    return JSON.parse(JSON.stringify(userTasks)) || [];
  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
          error.message || 'Failed to fetch tasks. Please, try again later.',
      };
    }
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}
