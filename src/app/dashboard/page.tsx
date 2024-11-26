import { auth } from '@/auth';
import SignOutBtn from './SignOutBtn';

export default async function DashboardPage() {
  const session = await auth();
  console.log('🚀 ~ DashboardPage ~ session:', session);

  return (
    <div>
      DashboardPage <SignOutBtn />
    </div>
  );
}
