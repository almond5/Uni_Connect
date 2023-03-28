import { getSession, signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps() {
  try {
    const events = await prisma.event.findMany({
      where: {},
    });

    return {
      props: {
        eventsFromDB: events,
      },
    };
  } catch (error) {
    const events = null;

    return {
      props: {
        eventsFromDB: events,
      },
    };
  }
}

const Events = ({ eventsFromDB }: { eventsFromDB: any }) => {
  const [events] = useState<Event[]>(eventsFromDB);
  const [studentView, setStudentView] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [superAdminView, setSuperAdminView] = useState(false);
  const { status: sesh } = useSession();

  useEffect(() => {
    if (window?.location.search.includes(Roles.STUDENT)) setStudentView(true);
    else if (window?.location.search.includes(Roles.ADMIN)) setAdminView(true);
    else if (window?.location.search.includes(Roles.SUPERADMIN))
      setSuperAdminView(true);
  }, []);

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <LoginView />;
  }

  return (
    <div className="py-10">
      <div className="absolute top-0 left-10 py-9">
        <Link href={'/'}>
          <button className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800">
            Back
          </button>
        </Link>
      </div>
      <div className="absolute top-0 right-10 py-9">
        <button
          className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800"
          onClick={() =>
            signOut({ callbackUrl: 'http://localhost:3000/logoutView' })
          }
        >
          Sign-Out
        </button>
      </div>
      <div className="flex justify-center">
        <div className="text-shadow px-4 font-bold text-2xl">
          <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
            Here are the all the events:
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
