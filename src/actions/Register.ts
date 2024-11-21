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

  const { client, collection, error } = await connectToDatabase(
    'user_db',
    'users',
  );

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
    if (error instanceof Error) {
      return { error: error.message };
    }
    return {
      error: 'Unknown error occurred while connecting to the database',
    };
  } finally {
    await client?.close();
  }
}
