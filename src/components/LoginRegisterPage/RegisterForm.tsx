'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormStatus from '../general/forms/FormStatus';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/actions/Register';
import { emailRegex, passwordRegex } from '@/utils/helpers';
import FormStatusType from '@/types/FormStatus';
import RegisterFormData from '@/types/RegisterFormData';

export default function RegisterForm() {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const formMethods = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setFormStatus({});

    const response = await register(data);

    if (response?.error) {
      setFormStatus({ error: response.error });
      return;
    }

    if (response?.success) {
      setFormStatus({ success: response.success });
      formMethods.reset();
      return;
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
          name="name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name is too short',
            },
            maxLength: {
              value: 24,
              message: 'Name is too long',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="font-semibold">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formMethods.control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: emailRegex,
              message: 'Please, enter a valid email',
            },
            maxLength: {
              value: 35,
              message: 'Email is too long',
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
              <FormLabel htmlFor="confirmPassword" className="font-semibold">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormStatus status={formStatus} />

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={formMethods.formState.isSubmitting}
        >
          {formMethods.formState.isSubmitting && (
            <LoaderCircleIcon className="animate-spin" />
          )}
          Create Account
        </Button>
      </form>
    </Form>
  );
}
