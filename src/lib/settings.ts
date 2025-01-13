'use server';

import { connectToDatabase } from '@/lib/mongodb';

export async function getSettings(id: string) {
  try {
    const { collection, error } = await connectToDatabase('settings');

    if (error) return { error };

    const userSettings = await collection?.findOne({ userId: id });
    return JSON.parse(JSON.stringify(userSettings));
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message ||
            'Failed to fetch settings. Please, try again later.'
          : 'Unknown error occurred',
    };
  }
}
