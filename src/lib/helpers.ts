import { NextRequest } from 'next/server';
import Task from '@/types/Task';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
export const passwordRegex = /[!@#$%]+/;

export function getFormattedLabel(label: string) {
  if (label.endsWith('e')) {
    return `${label.slice(0, -1)}ing...`;
  } else if (
    label === 'Log in' ||
    label === 'Change Password' ||
    label === 'Create Account'
  ) {
    return label;
  } else if (label === 'Submit') {
    return `${label}ting...`;
  }
  return `${label}ing...`;
}

export function getTasksByStatus(tasks: Task[], value: string) {
  return tasks.filter((task: Task) => task.status === value);
}

export function isAcceptedFileExtension(fileName: string) {
  const acceptedFileExtensions = ['jpg', 'jpeg', 'png'];

  return acceptedFileExtensions.some((acceptedFileExtension) =>
    fileName.endsWith(acceptedFileExtension),
  );
}

export function extractUserIdFromRequest(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    throw new Error('User ID is required');
  }

  return userId;
}
