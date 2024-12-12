import { Mail } from 'lucide-react';
import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import Github from '@/assets/github.svg';

export default function SocialAuthButtons() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <form
        className="w-full"
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <Button
          variant="outline"
          className="w-full"
          aria-label="Continue with Github"
        >
          <Github />
          Github
        </Button>
      </form>

      <form
        className="w-full"
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <Button
          variant="outline"
          className="w-full"
          aria-label="Continue with Google"
        >
          <Mail />
          Google
        </Button>
      </form>
    </div>
  );
}
