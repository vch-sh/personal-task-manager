import { NextRequest, NextResponse } from 'next/server';
import { extractUserIdFromRequest } from '@/lib/helpers';
import { getTasksFromDb } from '@/lib/tasks';

export async function GET(req: NextRequest) {
  try {
    const userId = extractUserIdFromRequest(req);
    const tasks = await getTasksFromDb(userId);
    return NextResponse.json(tasks);
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
