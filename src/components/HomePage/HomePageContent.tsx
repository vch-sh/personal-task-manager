'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePageContent() {
  const [initialOpacity, setInitialOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialOpacity(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <hgroup
      className={`${initialOpacity === 0 ? 'opacity-0' : 'opacity-100'} flex max-w-2xl flex-col gap-4 text-center transition-opacity duration-500`}
    >
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-slate-800/90 lg:text-5xl">
        Personal Task Manager
      </h1>
      <p className="text-default text-base sm:text-xl">
        Streamline your productivity with our intuitive task management system.
        Organize, prioritize, and accomplish your goals with ease.
      </p>
      <Link href="/login">
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-200 hover:scale-105"
        >
          Get Started
        </Button>
      </Link>
    </hgroup>
  );
}
