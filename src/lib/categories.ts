'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function getTaskCategoriesFromDb(id: string) {
  try {
    const { collection, error } = await connectToDatabase('categories');

    if (error) return { error };

    const taskCategories =
      (await collection
        ?.find({ $or: [{ name: 'all' }, { userId: id }] })
        .toArray()) || [];

    const allCategoryIndex = taskCategories?.findIndex(
      (category) => category._id.toString() === 'all',
    );

    if (allCategoryIndex && allCategoryIndex !== -1) {
      const allCategory = taskCategories?.splice(allCategoryIndex, 1)[0];
      taskCategories?.unshift(allCategory);
    }

    return JSON.parse(JSON.stringify(taskCategories)) || [];
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message ||
            'Failed to fetch task categories. Please, try again later.'
          : [],
    };
  }
}

export async function getCategoryById(id: string) {
  try {
    const { collection, error } = await connectToDatabase('categories');

    if (error) return { error };

    const category = await collection?.findOne({ _id: new ObjectId(id) });

    if (!category) {
      return { error: 'Category not found' };
    }

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message ||
            'Failed to fetch a category. Please, try again later.'
          : {},
    };
  }
}
