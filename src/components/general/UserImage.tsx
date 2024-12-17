'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import DefaultUserImage from '@/assets/default-user-image.webp';

type UserImageProps = {
  width: number;
  height: number;
};

export default function UserImage({ width, height }: UserImageProps) {
  const { data: session } = useSession();

  return (
    <Image
      src={session?.user.image ?? DefaultUserImage}
      alt="user image"
      width={width}
      height={height}
      className="rounded-full border"
      priority
    />
  );
}
