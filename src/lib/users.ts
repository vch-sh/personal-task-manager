import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from './mongodb';

export async function getUserByEmail(email: string) {
  const { client, collection, error } = await connectToDatabase('users');

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

export async function fetchUserById(id: string) {
  const { client, collection, error } = await connectToDatabase('users');

  if (error) throw new Error(error);

  try {
    const user = await collection?.findOne({ _id: new ObjectId(id) });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message || 'Failed to fetch a user by id' };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  } finally {
    await client?.close();
  }
}
