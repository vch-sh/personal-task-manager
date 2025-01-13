'use server';

import { connectToDatabase } from '@/lib/mongodb';
import User from '@/types/User';

export async function createUser(userData: User) {
  const { collection, error } = await connectToDatabase('users');

  if (error) throw new Error(error);

  try {
    const result = await collection?.insertOne({
      ...userData,
    });

    return result;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
