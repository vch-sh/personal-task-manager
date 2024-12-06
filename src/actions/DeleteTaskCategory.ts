'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function deleteTaskCategory(categoryId: string) {
  if (!categoryId) {
    return { error: 'Category ID is required' };
  }

  const { client, collection, error } = await connectToDatabase(
    'task_db',
    'categories',
  );

  if (error) return { error };

  try {
    const result = await collection?.deleteOne({
      _id: new ObjectId(categoryId),
    });

    if (!result?.acknowledged || result.deletedCount === 0) {
      return { error: 'Category not found or deletion failed' };
    }

    const taskCollection = client?.db('task_db').collection<Document>('tasks');

    if (!taskCollection) {
      return { error: 'Failed to connect to the task collection' };
    }

    const deleteAllTasksFromCategory = await taskCollection.deleteMany({
      category: categoryId,
    });

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Category and all tasks deleted successfully',
      result,
      deleteAllTasksFromCategory,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  } finally {
    await client?.close();
  }
}
