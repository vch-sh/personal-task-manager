import { NextRequest, NextResponse } from 'next/server';
import { getTaskCategories } from '@/lib/categories';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const taskCategories = await getTaskCategories(userId);
  return NextResponse.json(taskCategories);
}
