import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcryptjs from 'bcryptjs';
import { createUser } from './actions/CreateUser';
import { getUserByEmailFromDb } from './lib/users';
import LoginFormData from './types/LoginFormData';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as LoginFormData;

        const existingUser = await getUserByEmailFromDb(email);

        if (!existingUser) {
          throw new Error('Invalid credentials');
        }

        const passwordMatch = await bcryptjs.compare(
          String(password),
          existingUser.password,
        );

        if (!passwordMatch) {
          throw new Error('Invalid credentials');
        }

        const user = {
          name: existingUser.name,
          email: existingUser.email,
        };

        return user || null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'credentials') {
        return true;
      }

      const existingUser = await getUserByEmailFromDb(user?.email || '');

      if (existingUser?.email === user?.email) {
        return true;
      }

      await createUser({
        name: user?.name || '',
        email: user?.email || '',
        password: null,
        createdAt: new Date(),
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await getUserByEmailFromDb(user?.email || '');

        if (existingUser) {
          token.id = existingUser._id.toString();
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.iat = token.iat;
        session.user.exp = token.exp;
        session.user.jti = token.jti;
      }
      return session;
    },
  },
});
