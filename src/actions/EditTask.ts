'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import AddEditTaskFormData from '@/types/AddEditFormData';

export async function editTask(data: AddEditTaskFormData, taskId?: string) {
  if (!data) {
    return { error: 'Data is missing' };
  }

  const { collection, error } = await connectToDatabase('tasks');

  if (error) return { error };

  try {
    const result = await collection?.findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          text: data.text,
          status: data.status,
          priority: data.priority,
          category: data.category,
          dueDate: data.dueDate,
          editedAt: data.editedAt,
        },
      },
      { returnDocument: 'after' },
    );

    if (!result?._id) {
      return { error: 'Task not found or update failed' };
    }

    revalidatePath('/tasks');
    revalidatePath('/dashboard');

    return {
      success: 'Task updated successfully',
      taskId: result?._id.toString(),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
