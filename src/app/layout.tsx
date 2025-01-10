import type { Metadata } from 'next';
import { Quantico } from 'next/font/google';
import { auth } from '@/auth';
import AuthProvider from '@/components/general/AuthProvider';
import LoadingIndicator from '@/components/general/LoadingIndicator';
import ThemeProvider from '@/components/general/ThemeProvider';
import { getSettings } from '@/lib/settings';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Personal Task Manager',
    default: 'Personal Task Manager',
  },
  description:
    'Streamline your productivity with our intuitive task management system. Organize, prioritize, and accomplish your goals with ease.',
};

const quantico = Quantico({ subsets: ['latin'], weight: '400' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const settings = session ? await getSettings(session?.user.id) : null;
  const darkMode = settings?.darkMode ?? false;

  return (
    <html lang="en">
      <body
        className={`${quantico.className} bg-main-bg text-neutral-900 dark:bg-slate-800 dark:text-dark`}
      >
        <LoadingIndicator />
        <AuthProvider>
          <ThemeProvider darkMode={darkMode}>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
