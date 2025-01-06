'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function fetchTasks(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/tasks?userId=${encodeURIComponent(userId)}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      return { error: 'Failed to fetch tasks' };
    }

    return await res.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getTasks(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('tasks');
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

export async function getTaskById(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('tasks');
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
