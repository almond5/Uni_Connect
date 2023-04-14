import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'example@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const findUserEmail = await prisma.user.findFirst({
          where: {
            email: email,
          }
        })

        if (findUserEmail === null || findUserEmail === undefined) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password,
          },
        });

        if (user !== undefined && user !== null) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    strategy: 'jwt',
  },
  jwt: {},
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {      
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },

  events: {},
  debug: false,
});
