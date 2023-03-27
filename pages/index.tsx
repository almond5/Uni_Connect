import { getSession, useSession } from 'next-auth/react';
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

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (user === null) {
      return {
        props: {
          rolesFromDB: null,
        },
      };
    }

    return {
      props: {
        rolesFromDB: user?.role,
      },
    };
  } catch (error) {
    return {
      props: {
        rolesFromDB: Roles.STUDENT,
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
