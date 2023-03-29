import { signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useState } from 'react';
import Link from 'next/link';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

const WelcomePage = (props: { role: any }) => {
  const { status: sesh } = useSession();
  const [viewEvents, setViewEvents] = useState(false);
  const [viewRSOs, setViewRSOs] = useState(false);
  const role = props.role;
  // add other views

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <LoginView />;
  }

  if (role[0] === null) {
    return <LoginView />;
  }

  return (
    <div className="py-10">
      <div className="absolute top-0 right-10 py-10">
        <button
          className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50"
          onClick={() =>
            signOut({ callbackUrl: 'http://localhost:3000/logoutView' })
          }
        >
          Sign-Out
        </button>
      </div>
      <div className="flex justify-center">
        <div className="px-4 font-bold text-2xl">
          <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
            <Link href={{ pathname: '/events', query: role[0] }}>Events</Link>
          </div>
        </div>
        <div className="px-4 font-bold text-2xl">
          <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
            <Link href={'/rsos'}>RSOs</Link>
          </div>
        </div>
        <div className={`${(role === "SUPERADMIN") ? '' : 'hidden'}`}>
          <div className="px-4 font-bold text-2xl">
            <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
              <Link href={'/universities'}>Universities</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`${!viewRSOs && !viewEvents ? 'py-16' : 'hidden'}`}>
        <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50">
          Welcome!
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
