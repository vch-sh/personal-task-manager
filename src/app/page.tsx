import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-2">
      <hgroup className="flex max-w-2xl flex-col gap-4 text-center">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Personal Task Manager
        </h1>
        <p className="text-base sm:text-xl text-default">
          Streamline your productivity with our intuitive task management
          system. Organize, prioritize, and accomplish your goals with ease.
        </p>
        <Link href="/login">
          <Button size="lg">Get Started</Button>
        </Link>
      </hgroup>
    </main>
  );
}
