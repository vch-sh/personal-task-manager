'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import EditTaskFormData from '@/types/EditTaskFormData';

export async function editTask(taskId: string, data: EditTaskFormData) {
  if (!data) {
    return { error: 'Data is missing' };
  }

  const { client, collection, error } = await connectToDatabase(
    'task_db',
    'tasks',
  );

  if (error) return { error };

  try {
    const result = await collection?.findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          text: data.text,
          status: data.status,
          priority: data.priority,
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
      updatedTask: {
        ...result,
        _id: result?._id.toString(),
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  } finally {
    await client?.close();
  }
}
