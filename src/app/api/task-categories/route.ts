import { NextRequest, NextResponse } from 'next/server';
import { getTaskCategoriesFromDb } from '@/lib/categories';
import { extractUserIdFromRequest } from '@/lib/helpers';

export async function GET(req: NextRequest) {
  try {
    const userId = extractUserIdFromRequest(req);
    const taskCategories = await getTaskCategoriesFromDb(userId);
    return NextResponse.json(taskCategories);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occured';
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 400 },
    );
  }
}
