'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function getTasksFromApi(userId: string) {
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

export async function getTasksFromDb(id: string) {
  try {
    const { collection, error } = await connectToDatabase('tasks');

    if (error) return { error };

    const userTasks = await collection?.find({ userId: id }).toArray();
    return JSON.parse(JSON.stringify(userTasks)) || [];
  } catch (error) {
    return error instanceof Error
      ? {
          error:
            error.message || 'Failed to fetch tasks. Please, try again later.',
        }
      : [];
  }
}

export async function getTaskById(id: string) {
  try {
    const { collection, error } = await connectToDatabase('tasks');

    if (error) return { error };

    const userTask = await collection?.findOne({ _id: new ObjectId(id) });

    if (!userTask) {
      return { error: 'Task not found' };
    }

    return JSON.parse(JSON.stringify(userTask));
  } catch (error) {
    return error instanceof Error
      ? {
          error:
            error.message || 'Failed to fetch a task. Please, try again later.',
        }
      : {};
  }
}
