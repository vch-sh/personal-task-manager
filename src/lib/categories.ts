'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function fetchTaskCategories(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/task-categories?userId=${encodeURIComponent(userId)}`,
      {
        cache: 'force-cache',
      },
    );

    if (!res.ok) {
      return { error: 'Failed to fetch task categories' };
    }

    return await res.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getTaskCategories(id: string) {
  let collection;

  try {
    const connection = await connectToDatabase('categories');
    collection = connection.collection;

    if (!collection) {
      return { error: 'Collection not found' };
    }

    const taskCategories = await collection
      .find({ $or: [{ name: 'all' }, { userId: id }] })
      .toArray();

    const allCategoryIndex = taskCategories.findIndex(
      (category) => category._id.toString() === 'all',
    );

    if (allCategoryIndex !== -1) {
      const allCategory = taskCategories.splice(allCategoryIndex, 1)[0];
      taskCategories.unshift(allCategory);
    }

    return JSON.parse(JSON.stringify(taskCategories)) || [];
  } catch (error) {
    if (error instanceof Error) {
      return {
        error:
          error.message ||
          'Failed to fetch task categories. Please, try again later.',
      };
    }
    return [];
  }
}

export async function getCategoryById(id: string) {
  let collection;

  try {
    const connection = await connectToDatabase('categories');
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
  }
}
