export type ExtendedUser = DefaultSession['user'] & {
  id: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
