'use server';

import { connectToDatabase } from '@/lib/mongodb';
import User from '@/types/User';

export async function createUser(userData: User) {
  const { collection, error } = await connectToDatabase('users');

  if (error) throw new Error(error);

  const result = await collection?.insertOne({
    ...userData,
  });

  return result;
}
