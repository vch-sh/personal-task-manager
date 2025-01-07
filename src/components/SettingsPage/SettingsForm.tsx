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
import FormStatusType from '@/types/FormStatus';
import SettingsFormData from '@/types/SettingsFormData';

type SettingsFormProps = {
  userId: string;
};

export default function SettingsForm({ userId }: SettingsFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const formMethods = useForm<SettingsFormData>({
    defaultValues: {
      darkMode: false,
      isFilteringSortingOpen: false,
      completedHidden: false,
    },
  });

  async function onSubmit(data: SettingsFormData) {
    const formData = {
      ...data,
      userId,
    };
    console.log('🚀 ~ onSubmit ~ formData:', formData);
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
