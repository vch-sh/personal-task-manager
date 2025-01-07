import { Metadata } from 'next';
import { auth } from '@/auth';
import Header from '@/components/SettingsPage/Header';
import SettingsForm from '@/components/SettingsPage/SettingsForm';
import SettingsPageContent from '@/components/SettingsPage/SettingsPageContent';
import Tips from '@/components/SettingsPage/Tips';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  const session = await auth();

  return (
    <main className="container mx-auto min-h-screen min-w-[360px] max-w-xl px-4 py-8 sm:py-4">
      <Header />
      <SettingsPageContent>
        <SettingsForm userId={session?.user.id} />
      </SettingsPageContent>
      <Tips />
    </main>
  );
}
