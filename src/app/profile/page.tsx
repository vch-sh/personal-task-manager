import { Metadata } from 'next';
import Header from '@/components/ProfilePage/Header';
import ProfileSettingsContent from '@/components/ProfilePage/ProfileSettingsContent';

export const metadata: Metadata = {
  title: 'Profile Settings',
};

export default function ProfilePage() {
  return (
    <main className="container mx-auto min-h-screen min-w-[360px] max-w-xl px-4 py-8 sm:py-4">
      <Header />
      <ProfileSettingsContent />
    </main>
  );
}
