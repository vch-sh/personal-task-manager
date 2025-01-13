'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { findUserInCollection } from '@/lib/users';
import AddEditTaskFormData from '@/types/AddEditFormData';

export async function addTask(data: AddEditTaskFormData) {
  if (!data) {
    return { error: 'Data is missing' };
  }

  const { client, collection, error } = await connectToDatabase('tasks');

  if (error) return { error };

  const userCollection = client
    ?.db(process.env.MONGODB_DB)
    .collection<Document>('users');

  if (!userCollection) {
    return { error: 'Failed to connect to the user collection' };
  }

  const existingUser = await findUserInCollection(
    data.userId || '',
    userCollection,
  );

  if (!existingUser) {
    return { error: 'User not found' };
  }

  try {
    const task = await collection?.insertOne({
      _id: new ObjectId(data._id),
      userId: data.userId,
      text: data.text,
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
    });

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Task created successfully',
      taskId: task?.insertedId.toString(),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
