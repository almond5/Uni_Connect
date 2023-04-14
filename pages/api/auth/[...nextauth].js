import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      id: "google-login",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: 'read:user',
    }),
    CredentialsProvider({
      id: "email-login",
      name: "Email",
      async authorize(credentials, req){
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.username,
            password: credentials.password,
          },
        });
        return user
      },
      credentials: {
        username: { label: "Email", type: "text ", placeholder: "john@email.com"},
        password: { label: "Password", type: "password", placeholder: "********"},
      },
      pages:{
        signIn: '/auth/signIn.tsx',
      }
    }),

  ],
  database: process.env.DATABASE_URL,
  session: {
    strategy: 'jwt',
  },
  jwt: {},
  pages: {},
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