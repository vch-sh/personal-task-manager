'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
import { emailRegex, passwordRegex } from '@/lib/helpers';
import FormStatusType from '@/types/FormStatus';
import LoginFormData from '@/types/LoginFormData';

export default function LoginForm() {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const router = useRouter();

  const formMethods = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    setFormStatus({});

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error === 'Configuration') {
        setFormStatus({ error: 'Invalid credentials' });
      } else {
        setFormStatus({ success: 'Login successful' });
        router.push('/dashboard');
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus({ error: 'Something went wrong' });
      } else {
        setFormStatus({ error: 'Unknown error occurred. Please try later.' });
      }
    }
  }

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={formMethods.control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: emailRegex,
              message: 'Please, enter a valid email',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="font-semibold">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formMethods.control}
          name="password"
          rules={{
            required: 'Password is required',
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
              <FormLabel htmlFor="password" className="font-semibold">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormStatus status={formStatus} />

        <SubmitButton
          label="Log in"
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
