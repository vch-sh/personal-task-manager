'use client';

import { useState } from 'react';
import UserImage from '@/components/general/UserImage';
import UploadProfileImageForm from './UploadProfileImageForm';

type UploadProfileImageFormProps = { profileImageUrl: string };

export default function UploadProfileImage({
  profileImageUrl,
}: UploadProfileImageFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <section className="mb-4 flex flex-col items-center justify-center gap-4">
      <UserImage
        width={100}
        height={100}
        selectedImage={selectedImage}
        profileImageUrl={profileImageUrl}
      />
      <UploadProfileImageForm
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </section>
  );
}
