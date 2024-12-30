'use server';

import { compare, hash } from 'bcryptjs';
import { isAfter } from 'date-fns';
import { ObjectId } from 'mongodb';
import { auth } from '@/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { fetchUserById } from '@/lib/users';
import ChangePasswordFormData from '@/types/ChangePasswordFormData';

export async function changePassword(data: ChangePasswordFormData) {
  if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
    return { error: 'All fields are required' };
  }

  if (data.newPassword !== data.confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  if (data.newPassword.toLowerCase() === data.currentPassword.toLowerCase()) {
    return {
      error: 'New password must differ',
    };
  }

  const session = await auth();

  if (!session) {
    return { error: 'Not authenticated' };
  }

  if (isAfter(new Date(), session?.expires || '')) {
    return {
      error: 'Session expired. Log in again.',
    };
  }

  const existingUser = await fetchUserById(session?.user.id);

  if (!existingUser) {
    return { error: 'User not found' };
  }

  const isCurrentMatch = await compare(
    data.currentPassword,
    existingUser.password,
  );

  if (!isCurrentMatch) {
    return { error: 'Current password is incorrect' };
  }

  const hashedPassword = await hash(data.newPassword, 10);

  const { client, collection, error } = await connectToDatabase(
    'user_db',
    'users',
  );

  if (error) return { error };

  try {
    await collection?.updateOne(
      { _id: new ObjectId(existingUser._id) },
      { $set: { password: hashedPassword } },
    );

    return { success: 'Password updated successfully' };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Database error' };
  } finally {
    await client?.close();
  }
}
