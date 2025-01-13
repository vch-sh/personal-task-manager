'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { findUserInCollection } from '@/lib/users';
import AddEditCategoryFormData from '@/types/AddEditCategoryFormData';

export async function addCategory(data: AddEditCategoryFormData) {
  if (!data) {
    return { error: 'Data is missing' };
  }

  const { client, collection, error } = await connectToDatabase('categories');

  if (error) return { error };

  try {
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

    const existingCategory = await collection?.findOne({
      userId: data.userId,
      name: data.name,
    });

    if (existingCategory) {
      return { error: 'This category already exists' };
    }

    const createdCategory = await collection?.insertOne({
      _id: new ObjectId(data._id),
      userId: data.userId,
      name: data.name,
      color: data.color,
    });

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Task category created successfully',
      categoryId: createdCategory?.insertedId.toString(),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
