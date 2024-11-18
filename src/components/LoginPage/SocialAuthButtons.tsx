import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Github from '@/assets/github.svg';

export default function SocialAuthButtons() {
  return (
    <section className="w-full flex items-center justify-between gap-4">
      <Button
        variant="outline"
        className="w-full"
        aria-label="Continue with Github"
      >
        <Github />
        Github
      </Button>

      <Button
        variant="outline"
        className="w-full"
        aria-label="Continue with Google"
      >
        <Mail />
        Google
      </Button>
    </section>
  );
}
