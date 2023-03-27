import { signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useState } from 'react';
import Link from 'next/link';

const Events = () => {
  const { status: sesh } = useSession();

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
