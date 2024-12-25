import { Metadata } from 'next';
import Header from '@/components/ProfilePage/Header';
import ProfileSettingsContent from '@/components/ProfilePage/ProfileSettingsContent';
import UpdateProfileForm from '@/components/ProfilePage/UpdateProfileForm';
import UploadProfileImage from '@/components/ProfilePage/UploadProfileImage';
import ErrorMessage from '@/components/general/ErrorMessage';
import { getProfilePageData } from '@/data/profilePageData';

export const metadata: Metadata = {
  title: 'Profile Settings',
};

export default async function ProfilePage() {
  const { user, isOAuth2 } = await getProfilePageData();

  if (user && 'error' in user) {
    return <ErrorMessage message={user.error} />;
  }

  return (
    <main className="container mx-auto min-h-screen min-w-[360px] max-w-xl px-4 py-8 sm:py-4">
      <Header />
      <ProfileSettingsContent>
        <UploadProfileImage profileImageUrl={user?.profileImage} />
        <UpdateProfileForm isOAuth2={isOAuth2} user={user} />
      </ProfileSettingsContent>
    </main>
  );
}
