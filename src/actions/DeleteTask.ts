'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function deleteTask(taskId: string) {
  if (!taskId) {
    return { error: 'Task ID is required' };
  }

  const { collection, error } = await connectToDatabase('tasks');

  if (error) return { error };

  try {
    const result = await collection?.deleteOne({ _id: new ObjectId(taskId) });

    if (!result?.acknowledged) {
      return { error: 'Task not found or deletion failed' };
    }

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Task deleted successfully',
      result,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
