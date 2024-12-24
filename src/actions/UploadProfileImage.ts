'use server';

import { del, list, put } from '@vercel/blob';
import { auth } from '@/auth';
import { isAcceptedFileExtension } from '@/lib/helpers';

export async function uploadProfileImage(imageFile: File | null) {
  if (!imageFile) {
    return { error: 'Image file is required' };
  }

  const isAcceptedExtension = isAcceptedFileExtension(imageFile.name);

  if (!isAcceptedExtension) {
    return { error: 'File with this extension is not allowed' };
  }

  const session = await auth();
  const imageFileName = `${session?.user.id}.${imageFile.name}`;

  try {
    const allImages = await list();
    const deleteOldImages = allImages?.blobs
      .filter((blob) => blob.url.includes(session?.user.id))
      .map((blob) => del(blob.url));
    if (deleteOldImages && deleteOldImages.length > 0) {
      await Promise.all(deleteOldImages);
    }

    const uploadedImage = await put(imageFileName, imageFile, {
      access: 'public',
      addRandomSuffix: false,
    });

    return {
      success: 'Image uploaded successfully',
      profileImageUrl: uploadedImage.url,
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
