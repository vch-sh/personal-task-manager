'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormStatus from '@/components/general/forms/FormStatus';
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
import { updateSettings } from '@/actions/UpdateSettings';
import FormStatusType from '@/types/FormStatus';
import Settings from '@/types/Settings';

type SettingsFormProps = {
  userId: string;
  settings: Settings;
};

export default function SettingsForm({ userId, settings }: SettingsFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const formMethods = useForm<Settings>({
    defaultValues: {
      darkMode: settings.darkMode ?? false,
      isFilteringSortingOpen: settings.isFilteringSortingOpen ?? false,
      completedHidden: settings.completedHidden ?? false,
    },
  });

  async function onSubmit(data: Settings) {
    const formData = {
      ...data,
      userId,
    };

    setFormStatus({});

    try {
      const response = await updateSettings(formData);

      if (response?.error) {
        setFormStatus({ error: response.error });
        return;
      }

      if (response?.success) {
        setFormStatus({ success: response.success });

        if (data.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus({ error: error.message || 'Something went wrong' });
      } else {
        setFormStatus({ error: 'Unknown error occurred. Please try later.' });
      }
    }
  }

  return (
    <Form {...formMethods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormField
          name="darkMode"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 space-y-0.5">
              <FormControl>
                <Input
                  type="checkbox"
                  id="darkMode"
                  className="h-4 w-4"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="darkMode">Enable dark mode</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="isFilteringSortingOpen"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 space-y-0.5">
              <FormControl>
                <Input
                  type="checkbox"
                  id="isFilteringSortingOpen"
                  className="h-4 w-4"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="isFilteringSortingOpen">
                Filtering & Sorting open by default
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="completedHidden"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 space-y-0.5">
              <FormControl>
                <Input
                  type="checkbox"
                  id="completedHidden"
                  className="h-4 w-4"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="completedHidden">
                Completed tasks hidden by default
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormStatus status={formStatus} />

        <SubmitButton
          label="Save"
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
