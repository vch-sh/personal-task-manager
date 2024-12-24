'use client';

// import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import FormStatus from '@/components/general/forms/FormStatus';
import SubmitButton from '@/components/general/forms/SubmitButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { emailRegex } from '@/lib/helpers';
// import FormStatusType from '@/types/FormStatus';
import UpdateProfileSettingsFormData from '@/types/UpdateProfileSettingsFormData';
import ChangePassword from './ChangePassword';
import SessionFormDataProvider from './SessionFormDataProvider';

type UpdateProfileFormProps = { isOAuth2: boolean };

export default function UpdateProfileForm({
  isOAuth2,
}: UpdateProfileFormProps) {
  // const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const formMethods = useForm<UpdateProfileSettingsFormData>({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: UpdateProfileSettingsFormData) {
    console.log('🚀 ~ UpdateProfileForm ~ data:', data);
  }

  return (
    <SessionFormDataProvider formMethods={formMethods}>
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={formMethods.control}
            name="name"
            rules={{
              maxLength: {
                value: 30,
                message: 'Maximum 30 characters',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="email"
            rules={{
              maxLength: {
                value: 30,
                message: 'Maximum 30 characters',
              },
              pattern: {
                value: emailRegex,
                message: 'Please, enter a valid email',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    value={field.value}
                    disabled={isOAuth2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isOAuth2 && (
            <p className="-mt-3 text-right text-xs font-bold text-gray-500">
              Email cannot be changed for Google or GitHub users
            </p>
          )}
          {!isOAuth2 && <ChangePassword />}
          {/* <FormStatus status={formStatus} /> */}
          <SubmitButton
            label="Update"
            isSubmitting={formMethods.formState.isSubmitting}
          />
        </form>
      </Form>
    </SessionFormDataProvider>
  );
}
