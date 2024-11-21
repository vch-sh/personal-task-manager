import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { connectToDatabase } from './lib/mongodb';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
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
