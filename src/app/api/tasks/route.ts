import { NextRequest, NextResponse } from 'next/server';
import { getTasksFromDb } from '@/lib/tasks';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const tasks = await getTasksFromDb(userId);
  return NextResponse.json(tasks);
}
