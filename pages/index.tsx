import { getSession, useSession, getProviders } from 'next-auth/react';
import LoginView from '../components/loginView';
import prisma from '../lib/prismadb';
import { useState } from 'react';
import WelcomePage from './welcomePage';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const providers = await getProviders();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user!.email!,
      },
    });

    if (user === null) {
      return {
        props: {
          rolesFromDB: null,
          providersFromAuth: providers
        },
      };
    }

    return {
      props: {
        rolesFromDB: user?.role,
        providersFromAuth: providers
      },
    };
  } catch (error) {
    return {
      props: {
        rolesFromDB: Roles.STUDENT,
        providersFromAuth: providers
      },
    };
  }
}

const Index = ({ rolesFromDB, providersFromAuth }: { rolesFromDB: any, providersFromAuth: any}) => {
  const { status: session } = useSession();
  const role = useState(rolesFromDB);
  const provs = useState(providersFromAuth)
  if (session === 'loading') {
    return null;
  }

  if (session === 'unauthenticated') {
    return <LoginView providers={providersFromAuth} />;
  }

  return <WelcomePage role={role} providers ={provs} />;
};

export default Index;
