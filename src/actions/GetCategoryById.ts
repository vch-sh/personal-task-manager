'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function getCategoryById(id: string) {
  let client;
  let collection;

  try {
    const connection = await connectToDatabase('task_db', 'categories');
    client = connection.client;
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const category = await collection.findOne({ _id: new ObjectId(id) });

    if (!category) {
      return { error: 'Category not found' };
    }

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
          error.message ||
          'Failed to fetch a category. Please, try again later.',
      };
    }
    return {};
  } finally {
    if (client) {
      await client.close();
    }
  }
}
