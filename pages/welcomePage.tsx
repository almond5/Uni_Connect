import { signOut, useSession, getProviders } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import router from 'next/router';

const WelcomePage = (props: { role: any }) => {
  const { status: sesh } = useSession();

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/login');
  }

  if (props.role === null) {
    router.push('/login');
  }

  if (props.role[0] === null) {
    router.push('/login');
  }

  if (sesh === 'authenticated') {
    return (
      <div className="py-10">
        <div className="absolute top-0 right-10 py-10">
          <button
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50"
            onClick={() =>
              signOut({ callbackUrl: 'http://localhost:3000/logout' })
            }
          >
            Sign-Out
          </button>
        </div>
        <div className="flex justify-center">
          <div className="px-4 font-bold text-2xl">
            <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
              <Link href={'/events'}>Events</Link>
            </div>
          </div>
          <div className="px-4 font-bold text-2xl">
            <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
              <Link href={'/rsos'}>RSOs</Link>
            </div>
          </div>
          <div className={`${props.role[0] === 'SUPERADMIN' ? '' : 'hidden'}`}>
            <div className="px-4 font-bold text-2xl">
              <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
                <Link href={'/universities'}>Universities</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50">
            Welcome!
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default WelcomePage;
