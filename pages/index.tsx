import { getSession, useSession, getProviders } from 'next-auth/react';
import prisma from '../lib/prismadb';
import { useState } from 'react';
import WelcomePage from './welcomePage';
import router from 'next/router';

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
        email: session?.user!.email!,
      },
    });

    if (user === null) {
      return {
        props: {
          rolesFromDB: null,
        },
      };
    }

    const uni = await prisma.university.findMany({
      where: {}
    })

    return {
      props: {
        unisFromDB: uni,
        rolesFromDB: user?.role,
      },
    };
  } catch (error) {
    return {
      props: {
        unisFromDB: '',
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
    router.push("/login")
  }

  return <WelcomePage role={role} />;
};

export default Index;
