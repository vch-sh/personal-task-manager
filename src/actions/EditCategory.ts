'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserById } from '@/lib/users';
import AddEditCategoryFormData from '@/types/AddEditCategoryFormData';

export async function editCategory(data: AddEditCategoryFormData) {
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

    const existingUser = await getUserById(data.userId || '', userCollection);

    if (!existingUser) {
      return { error: 'User not found' };
    }

    const existingCategory = await collection?.findOne({
      _id: { $ne: new ObjectId(data._id) },
      userId: data.userId,
      name: data.name,
    });

    if (existingCategory) {
      return { error: 'This category already exists' };
    }

    const updatedCategory = await collection?.findOneAndUpdate(
      { _id: new ObjectId(data._id) },
      {
        $set: {
          name: data.name,
          color: data.color,
        },
      },
      { returnDocument: 'after' },
    );

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Category updated successfully',
      categoryId: updatedCategory?._id.toString(),
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
