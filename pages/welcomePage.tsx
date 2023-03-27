import { signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import Leave from '../components/svgs/Leave.svg';
import React, { useState } from 'react';
import Link from 'next/link';

const WelcomePage = () => {
  const { status: sesh } = useSession();
  const [viewEvents, setViewEvents] = useState(false);
  const [viewRSOs, setViewRSOs] = useState(false);
  // add other views

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <LoginView />;
  }

  return (
    <div className="py-10">
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
      <div className="px-4 font-bold text-2xl">
          <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
            <Link href={'/events'}>View Events</Link>
          </div>
        </div>
        <div className="px-4 font-bold text-2xl">
          <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
            <Link href={'/rsos'}>View RSOs</Link>
          </div>
        </div>
      </div>
      <div className={`${!viewRSOs && !viewEvents ? 'py-16' : 'hidden'}`}>
        <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800">
          Welcome!
        </div>
      </div>
      {/* <div className={`${createNoteView ? '' : 'hidden'}`}>
      <NoteCreate />
    </div>
    <div className={`${myNotesView ? '' : 'hidden'}`}>
      <NoteDelete notes={notes} />
    </div> */}
    </div>
  );
};

export default WelcomePage;
