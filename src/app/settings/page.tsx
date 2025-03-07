import { Metadata } from 'next';
import { auth } from '@/auth';
import Header from '@/components/SettingsPage/Header';
import SettingsForm from '@/components/SettingsPage/SettingsForm';
import SettingsPageContent from '@/components/SettingsPage/SettingsPageContent';
import Tips from '@/components/SettingsPage/Tips';
import { getSettings } from '@/lib/settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  const session = await auth();
  const settings = session ? await getSettings(session?.user.id) : null;

  return (
    <main className="container mx-auto min-h-screen min-w-[360px] max-w-xl px-4 py-8 sm:py-4">
      <Header />
      <SettingsPageContent>
        <SettingsForm userId={session?.user.id} settings={settings} />
      </SettingsPageContent>
      <Tips />
    </main>
  );
}
