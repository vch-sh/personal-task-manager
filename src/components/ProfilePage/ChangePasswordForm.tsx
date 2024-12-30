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
import { changePassword } from '@/actions/ChangePassword';
import { passwordRegex } from '@/lib/helpers';
import ChangePasswordFormData from '@/types/ChangePasswordFormData';
import FormStatusType from '@/types/FormStatus';

type ChangePasswordFormProps = {
  handleClose: () => void;
};

export default function ChangePasswordForm({
  handleClose,
}: ChangePasswordFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const formMethods = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: ChangePasswordFormData) {
    const response = await changePassword(data);

    if (response?.error) {
      setFormStatus({ error: response.error });
      return;
    }

    if (response?.success) {
      setFormStatus({ success: response.success });
      setTimeout(() => handleClose(), 2000);
      return;
    }
  }

  return (
    <Form {...formMethods}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          const validatedSubmit = formMethods.handleSubmit(onSubmit);
          validatedSubmit(e);
        }}
        className="flex flex-col gap-4"
      >
        <FormField
          control={formMethods.control}
          name="currentPassword"
          rules={{
            required: 'Current password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters',
            },
            maxLength: {
              value: 24,
              message: "Password shouldn't exceed 24 characters",
            },
            pattern: {
              value: passwordRegex,
              message: 'Password must include a special character: !@#$%',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="newPassword"
          rules={{
            required: 'New password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters',
            },
            maxLength: {
              value: 24,
              message: "Password shouldn't exceed 24 characters",
            },
            pattern: {
              value: passwordRegex,
              message: 'Password must include a special character: !@#$%',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="confirmPassword"
          rules={{
            required: 'Password confirmation is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters',
            },
            maxLength: {
              value: 24,
              message: "Password shouldn't exceed 24 characters",
            },
            pattern: {
              value: passwordRegex,
              message: 'Password must include a special character: !@#$%',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormStatus status={formStatus} />
        <SubmitButton
          label="Change Password"
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
