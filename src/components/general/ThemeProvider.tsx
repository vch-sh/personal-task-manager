'use client';

import { PropsWithChildren, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type ThemeProviderProps = {
  darkMode: boolean;
} & PropsWithChildren;

export default function ThemeProvider({
  darkMode,
  children,
}: ThemeProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (darkMode && pathname !== '/' && pathname !== '/login') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, pathname]);

  return <>{children}</>;
}
