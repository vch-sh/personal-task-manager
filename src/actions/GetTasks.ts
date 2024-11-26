'use server';

import { connectToDatabase } from '@/lib/mongodb';

export async function getTasks(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('task_db', 'tasks');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      throw new Error('Collection not found');
    }

    const userTasks = await collection.find({ userId: id }).toArray();
    return JSON.parse(JSON.stringify(userTasks)) || [];
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
}
