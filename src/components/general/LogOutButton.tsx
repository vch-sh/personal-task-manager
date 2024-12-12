'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full"
      onClick={() => signOut()}
    >
      Log out
      <LogOut />
    </Button>
  );
}
