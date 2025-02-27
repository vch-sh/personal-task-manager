'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { findUserInCollection } from '@/lib/users';
import AddEditCategoryFormData from '@/types/AddEditCategoryFormData';

export async function editCategory(data: AddEditCategoryFormData) {
  if (!data) {
    return { error: 'Data is missing' };
  }

  const { client, collection, error } = await connectToDatabase('categories');

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

  const existingCategory = await collection?.findOne({
    _id: { $ne: new ObjectId(data._id) },
    userId: data.userId,
    name: data.name,
  });

  if (existingCategory) {
    return { error: 'This category already exists' };
  }

  try {
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
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
