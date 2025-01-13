import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from './mongodb';

export async function findUserInCollection(
  id: string,
  collection: Collection<Document>,
) {
  try {
    const user = await collection?.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message || 'Failed to fetch a user by id'
          : 'Unknown error occurred',
    };
  }
}

export async function getUserByEmailFromDb(email: string) {
  const { collection, error } = await connectToDatabase('users');
  if (error) throw new Error(error);
  const user = await collection?.findOne({ email });
  return user;
}

export async function getUserByIdFromDb(id: string) {
  const { collection, error } = await connectToDatabase('users');
  if (error) return { error };

  try {
    const user = await collection?.findOne({ _id: new ObjectId(id) });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message || 'Failed to fetch a user by id'
          : 'Unknown error occurred',
    };
  }
}
