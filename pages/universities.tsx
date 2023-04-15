import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import UniListView from '@/components/unis/uniListView';
import UniCreateView from '@/components/unis/uniCreateView';
import { University } from '@prisma/client';
import router from 'next/router';

export async function getServerSideProps() {
  try {
    const universities = await prisma.university.findMany({
      where: {},
      include: { location: true },
    });

    return {
      props: {
        universitiesFromDB: universities,
      },
    };
  } catch (error) {
    const universities = null;
    return {
      props: {
        universitiesFromDB: universities,
      },
    };
  }
}

const Universities = ({ universitiesFromDB }: { universitiesFromDB: any }) => {
  const [universities] = useState<University[]>(universitiesFromDB);
  const [uniListView, setUniListView] = useState(false);
  const [createUniView, setCreateUniView] = useState(false);
  const { status: sesh } = useSession();

  const toggleUniListView = () => {
    uniListView ? setUniListView(false) : setUniListView(true);
  };

  const toggleCreateUniView = () => {
    createUniView ? setCreateUniView(false) : setCreateUniView(true);
  };

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/login');
  }
  
  if (sesh === 'authenticated') {
    return (
      <div className="py-10">
        <div className="absolute top-0 left-10 py-10">
          <Link href={'/'}>
            <button className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800">
              Back
            </button>
          </Link>
        </div>
        <div className="absolute top-0 right-10 py-10">
          <button
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800"
            onClick={() =>
              signOut({ callbackUrl: 'http://localhost:3000/logout' })
            }
          >
            Sign-Out
          </button>
        </div>
        <div className="flex justify-center">
          <div className="px-4 font-bold text-2xl">
            <div
              className={`${
                !uniListView
                  ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                  : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
              }`}
            >
              {' '}
              <button
                onClick={() => {
                  toggleUniListView();
                  setCreateUniView(false);
                }}
              >
                View Universities
              </button>
            </div>
          </div>
          <div className="px-4 font-bold text-2xl">
            <div
              className={`${
                !createUniView
                  ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                  : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
              }`}
            >
              {' '}
              <button
                onClick={() => {
                  toggleCreateUniView();
                  setUniListView(false);
                }}
              >
                Create University
              </button>
            </div>
          </div>
        </div>
        <div className={`${uniListView ? '' : 'hidden'}`}>
          <UniListView universities={universities} />
        </div>
        <div className={`${createUniView ? '' : 'hidden'}`}>
          <UniCreateView />
        </div>
      </div>
    );
  }
};

export default Universities;
