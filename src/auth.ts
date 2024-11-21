import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcryptjs from 'bcryptjs';
import { connectToDatabase } from './lib/mongodb';

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
        const { email, password } = credentials;

        const { client, collection, error } = await connectToDatabase(
          'user_db',
          'users',
        );

        if (error) throw new Error(error);

        const existingUser = await collection?.findOne({ email });

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

        await client?.close();

        const user = {
          id: JSON.parse(JSON.stringify(existingUser._id)),
          name: existingUser.name,
          email: existingUser.email,
        };

        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.sub;
        session.user.iat = token.iat;
        session.user.exp = token.exp;
        session.user.jti = token.jti;
      }
      return session;
    },
  },
});
