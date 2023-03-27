import { getSession, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import prisma from '../lib/prismadb';
import Role from '@prisma/client';
import { useState } from 'react';
import WelcomePage from './welcomePage';

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    return {
      props: {
        rolesFromDB: user?.role,
      },
    };
  } catch (error) {
    const role = null;

    return {
      props: {
        rolesFromDB: Role?.Role.USER,
      },
    };
  }
}

const Index = ({ rolesFromDB }: { rolesFromDB: any }) => {
  const { status: session } = useSession();
  const role = useState(rolesFromDB);
  
  if (session === 'loading') {
    return null;
  }

  if (session === 'unauthenticated') {
    return <LoginView />;
  }

  return <WelcomePage role={role} />;
};

export default Index;
