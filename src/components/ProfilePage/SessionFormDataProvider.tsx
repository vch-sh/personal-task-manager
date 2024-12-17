import { PropsWithChildren, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import UpdateProfileSettingsFormData from '@/types/UpdateProfileSettingsFormData';

type SessionFormDataProviderProps = {
  formMethods: UseFormReturn<UpdateProfileSettingsFormData, any, undefined>;
} & PropsWithChildren;

export default function SessionFormDataProvider({
  formMethods,
  children,
}: SessionFormDataProviderProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      formMethods.reset({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [status, session, formMethods]);

  if (status === 'loading') {
    return (
      <p className="animate-bounce text-center text-sm font-bold">Loading...</p>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <p className="animate-bounce text-center text-sm font-bold">
        You need to log in to update your profile.
      </p>
    );
  }

  return <>{children}</>;
}
