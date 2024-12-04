import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/general/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Personal Task Manager',
    default: 'Personal Task Manager',
  },
  description:
    'Streamline your productivity with our intuitive task management system. Organize, prioritize, and accomplish your goals with ease.',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
