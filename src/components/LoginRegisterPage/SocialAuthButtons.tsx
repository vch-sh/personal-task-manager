'use client';

import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Github from '@/assets/github.svg';

export default function SocialAuthButtons() {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <Button
        variant="outline"
        className="w-full"
        aria-label="Continue with Github"
        onClick={() => signIn('github', { redirectTo: '/dashboard' })}
      >
        <Github />
        Github
      </Button>

      <Button
        variant="outline"
        className="w-full"
        aria-label="Continue with Google"
        onClick={() => signIn('google', { redirectTo: '/dashboard' })}
      >
        <Mail />
        Google
      </Button>
    </div>
  );
}
