'use client';

import { useForm } from 'react-hook-form';
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
import { emailRegex, passwordRegex } from '@/utils/helpers';
import LoginFormData from '@/types/LoginFormData';

export default function LoginForm() {
  const formMethods = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    console.log('🚀 ~ onSubmit ~ data:', data);
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

        <Button type="submit" className="w-full font-semibold">
          Login
        </Button>
      </form>
    </Form>
  );
}
