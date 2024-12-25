'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserById } from '@/lib/users';
import UpdateProfileSettingsFormData from '@/types/UpdateProfileSettingsFormData';

export async function updateNameEmailForCredentials(
  data: UpdateProfileSettingsFormData,
) {
  if (!data) {
    return { error: 'Profile data is required' };
  }

  const { client, error } = await connectToDatabase('user_db', 'users');

  if (error) return { error };

  const userCollection = client?.db('user_db').collection<Document>('users');

  if (!userCollection) {
    return { error: 'Failed to connect to the user collection' };
  }

  const existingUser = await getUserById(data.userId, userCollection);

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const existingUserId = JSON.parse(JSON.stringify(existingUser))._id;

  if (existingUserId !== data.userId) {
    return { error: 'Failed to update a user' };
  }

  await userCollection.updateOne(
    { _id: new ObjectId(existingUserId) },
    { $set: { name: data.name, email: data.email } },
  );

  revalidatePath('/profile');

  return { success: 'Profile details updated successfully' };
}
