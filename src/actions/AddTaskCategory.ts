'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserById } from '@/lib/users';
import AddTaskCategoryFormData from '@/types/AddTaskCategoryFormData';

export async function addTaskCategory(data: AddTaskCategoryFormData) {
  if (!data) {
    return { error: 'Data is missing' };
  }

  const { client, collection, error } = await connectToDatabase(
    'task_db',
    'categories',
  );

  if (error) return { error };

  try {
    const userCollection = client?.db('user_db').collection<Document>('users');

    if (!userCollection) {
      return { error: 'Failed to connect to the user collection' };
    }

    const existingUser = await getUserById(
      data.userId?.toString() || '',
      userCollection,
    );

    if (!existingUser) {
      return { error: 'User not found' };
    }

    const existingCategory = await collection?.findOne({
      userId: data.userId,
      name: data.name,
    });

    if (existingCategory) {
      return { error: 'This category already exists' };
    }

    const newCategory = await collection?.insertOne(data);

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Task category created successfully',
      newCategoryId: newCategory?.insertedId.toString(),
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  } finally {
    await client?.close();
  }
}
