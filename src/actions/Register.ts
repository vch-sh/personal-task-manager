'use server';

import bcryptjs from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import RegisterFormData from '@/types/RegisterFormData';

export async function register({
  name,
  email,
  password,
  confirmPassword,
}: RegisterFormData): Promise<{ error?: string; success?: string }> {
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  const { collection, error } = await connectToDatabase('users');

  if (error) return { error };

  try {
    const isUserExist = await collection?.findOne({ email });

    if (isUserExist) {
      return { error: 'Email is already in use' };
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    await collection?.insertOne({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
      createdAt: new Date(),
    });

    return { success: 'User registered successfully!' };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
