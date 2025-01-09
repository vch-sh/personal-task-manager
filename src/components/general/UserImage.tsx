'use client';

import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import DefaultUserImage from '@/assets/default-user-image.webp';

type UserImageProps = {
  width: number;
  height: number;
  selectedImage?: File | null;
  profileImageUrl?: string;
};

export default function UserImage({
  width,
  height,
  selectedImage,
  profileImageUrl,
}: UserImageProps) {
  const { data: session } = useSession();

  const userImage = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    } else if (profileImageUrl) {
      return profileImageUrl;
    } else {
      return session?.user.image ?? DefaultUserImage;
    }
  }, [selectedImage, session?.user.image, profileImageUrl]);

  return (
    <div
      className="flex items-center overflow-hidden rounded-full border dark:border-neutral-700"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        src={userImage}
        alt="user image"
        width={width}
        height={height}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
