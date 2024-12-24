'use server';

import { put } from '@vercel/blob';
import { auth } from '@/auth';
import { isAcceptedFileExtension } from '@/lib/helpers';

export async function uploadProfileImage(imageFile: File | null) {
  if (!imageFile) {
    return { error: 'Image file is required' };
  }

  const session = await auth();
  const extension = isAcceptedFileExtension(imageFile.name);
  const userImageFileName = `${session?.user.id}.${extension}`;

  try {
    const blob = await put(userImageFileName, imageFile, {
      access: 'public',
      addRandomSuffix: false,
    });

    return {
      success: 'Image uploaded successfully',
      profileImageUrl: blob.url,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  }
}
