'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { getUserById } from '@/lib/users';
import SettingsFormData from '@/types/SettingsFormData';

export async function updateSettings(data: SettingsFormData) {
  const { client, collection, error } = await connectToDatabase('settings');

  if (error) return { error };

  const userCollection = client
    ?.db(process.env.MONGODB_DB)
    .collection<Document>('users');

  if (!userCollection) {
    return { error: 'Failed to connect to the user collection' };
  }

  const existingUser = await getUserById(data.userId, userCollection);

  if (!existingUser) {
    return { error: 'User not found' };
  }

  try {
    await collection?.updateOne(
      { userId: data.userId },
      {
        $set: {
          userId: data.userId,
          darkMode: data.darkMode,
          isFilteringSortingOpen: data.isFilteringSortingOpen,
          completedHidden: data.completedHidden,
        },
      },
      { upsert: true },
    );

    return {
      success: 'Application settings updated successfully',
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Database error' };
  } finally {
    await client?.close();
  }
}
