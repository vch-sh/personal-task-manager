import { auth } from '@/auth';
import { getUserByIdFromDb } from '@/lib/users';

export async function getProfilePageData() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    const user = await getUserByIdFromDb(session?.user.id);
    const isOAuth2 =
      session?.user?.image?.includes('google') ||
      session?.user?.image?.includes('github');

    return { user, isOAuth2 };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
