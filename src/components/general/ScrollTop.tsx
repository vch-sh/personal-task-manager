'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    function toggleVisibility() {
      if (document.documentElement.scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          className="fixed bottom-4 left-4 w-10 bg-opacity-35 shadow-lg dark:bg-slate-50/10 dark:hover:bg-slate-50/10"
          onClick={scrollToTop}
        >
          <ArrowUp className="dark:text-slate-50" />
        </Button>
      )}
    </>
  );
}
