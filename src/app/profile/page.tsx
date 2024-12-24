import { Metadata } from 'next';
import { auth } from '@/auth';
import Header from '@/components/ProfilePage/Header';
import ProfileSettingsContent from '@/components/ProfilePage/ProfileSettingsContent';
import UpdateProfileForm from '@/components/ProfilePage/UpdateProfileForm';
import UploadProfileImage from '@/components/ProfilePage/UploadProfileImage';
import { getUserByEmail } from '@/lib/users';

export const metadata: Metadata = {
  title: 'Profile Settings',
};

export default async function ProfilePage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user.email);
  const isOAuth2 =
    session?.user?.image?.includes('google') ||
    session?.user?.image?.includes('github');

  return (
    <main className="container mx-auto min-h-screen min-w-[360px] max-w-xl px-4 py-8 sm:py-4">
      <Header />
      <ProfileSettingsContent>
        <UploadProfileImage profileImageUrl={user?.profileImage} />
        <UpdateProfileForm
          isOAuth2={isOAuth2}
          user={JSON.parse(JSON.stringify(user))}
        />
      </ProfileSettingsContent>
    </main>
  );
}
