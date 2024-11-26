'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function SignOutBtn() {
  return (
    <Button onClick={() => signOut()} type="button">
      Sign Out
    </Button>
  );
}
