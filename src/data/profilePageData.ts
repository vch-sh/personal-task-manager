import { auth } from '@/auth';
import { fetchUserById } from '@/lib/users';

export async function getProfilePageData() {
  const session = await auth();
  const user = await fetchUserById(session?.user.id);
  const isOAuth2 =
    session?.user?.image?.includes('google') ||
    session?.user?.image?.includes('github');

  return { user, isOAuth2 };
}
