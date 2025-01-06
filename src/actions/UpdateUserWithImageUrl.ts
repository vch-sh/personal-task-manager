'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { auth } from '@/auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function updateUserWithImageUrl(url: string) {
  if (!url) {
    return { error: 'Image url is required' };
  }

  const session = await auth();
  const userId = session?.user.id ? new ObjectId(session.user.id) : null;

  if (!userId) {
    return { error: 'User ID is invalid' };
  }

  const { client, collection, error } = await connectToDatabase('users');

  if (error) return { error };

  try {
    const response = await collection?.findOneAndUpdate(
      { _id: userId },
      { $set: { profileImage: url } },
      { returnDocument: 'after' },
    );

    revalidatePath('/profile');

    return {
      success: 'Image updated successfully',
      profileImage: response?.profileImage,
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
