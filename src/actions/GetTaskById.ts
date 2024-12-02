'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function getTaskById(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('task_db', 'tasks');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const userTask = await collection.findOne({ _id: new ObjectId(id) });

    if (!userTask) {
      return { error: 'Task not found' };
    }

    return JSON.parse(JSON.stringify(userTask));
  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
          error.message || 'Failed to fetch a task. Please, try again later.',
      };
    }
    return {};
  } finally {
    if (client) {
      await client.close();
    }
  }
}
