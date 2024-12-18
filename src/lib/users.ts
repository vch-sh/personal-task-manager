import { Collection, ObjectId } from 'mongodb';
import User from '@/types/User';
import { connectToDatabase } from './mongodb';

export async function getUserByEmail(email: string) {
  const { client, collection, error } = await connectToDatabase(
    'user_db',
    'users',
  );

  if (error) throw new Error(error);

  const user = await collection?.findOne({ email });
  await client?.close();
  return user;
}

export async function getUserById(
  id: string,
  collection: Collection<Document>,
) {
  try {
    const user = await collection?.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return { error: 'Failed to fetch a user by id' };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  }
}

export async function createUser(userData: User) {
  const { client, collection, error } = await connectToDatabase(
    'user_db',
    'users',
  );

  if (error) throw new Error(error);

  const result = await collection?.insertOne({
    ...userData,
  });

  await client?.close();
  return result;
}
