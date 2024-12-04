import { NextRequest, NextResponse } from 'next/server';
import { getTaskCategories } from '@/actions/GetTaskCategories';

export async function GET(req: NextRequest) {
  const taskCategories = await getTaskCategories();
  return NextResponse.json(taskCategories);
}
