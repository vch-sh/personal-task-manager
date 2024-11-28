'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LogOutButton() {
  return (
    <Button onClick={() => signOut()} type="button">
      Log Out
      <LogOut />
    </Button>
  );
}
