import { signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import RSOSListView from '@/components/rsos/rsosListView';
import RSOCreateView from '@/components/rsos/createRSOView';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps() {
  try {
    const rsos = await prisma.rSO.findMany({
      where: {},
    });

    return {
      props: {
        rsosFromDB: rsos,
      },
    };

  } catch(error) {
    const rsos = null;

    return {
      props: {
        rsosFromDB: rsos,
      },
    };
  }
}

const RSOs = ({ rsosFromDB } : { rsosFromDB: any }) => {
  const [rsos] = useState<Event[]>(rsosFromDB);
  const { status: sesh } = useSession();
  
  const [studentView, setStudentView] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [superAdminView, setSuperAdminView] = useState(false);

  const [rsoListView, setRSOListView] = useState(false);
  const [createRSOView, setCreateRSOView] = useState(false);
  const [approvalRSOView, setApprovalRSOView] = useState(false);

  const toggleRSOsListView = () => {
    rsoListView ? setRSOListView(false) : setRSOListView(true);
    setCreateRSOView(false);
    setApprovalRSOView(false);
  };

  const toggleCreateRSOView = () => {
    createRSOView ? setCreateRSOView(false) : setCreateRSOView(true);
    setRSOListView(false);
    setApprovalRSOView(false);
  };

  const toggleApprovalsView = () => {
    approvalRSOView ? setApprovalRSOView(false) : setApprovalRSOView(true);
    setRSOListView(false);
    setCreateRSOView(false);
  };
  

  useEffect(() => {
      if(window?.location.search.includes(Roles.STUDENT)) setStudentView(true);
      else if(window?.location.search.includes(Roles.ADMIN)) setAdminView(true);
      else if(window?.location.search.includes(Roles.SUPERADMIN)) setSuperAdminView(true);
  }, []);

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <LoginView />;
  }
  if(studentView) {
  return (
    <div className="py-10">
      <div className="absolute top-0 left-10 py-10">
        <Link href={'/'}>
          <button className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50">
            Back
          </button>
        </Link>
      </div>
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
        <div className={`${
          !rsoListView
            ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
            : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
          }`}
        >
              {' '}
              <button onClick={() => {toggleRSOsListView();}}>View RSOs</button>
            </div>
          </div>
        <div className="px-4 font-bold text-2xl">
        <div className={`${
          !createRSOView
            ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
            : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
          }`}
        >
              {' '}
              <button onClick={() => {toggleCreateRSOView();}}>Create RSO</button>
            </div>
        </div>
      </div>
      
      <div className={`${rsoListView ? 'py-10' : 'hidden'}`}>
          <RSOSListView rsos={rsos} />
      </div>
    </div>
  );
  }
  else {
    return (
    <div className="py-10">
      <div className="absolute top-0 left-10 py-10">
        <Link href={'/'}>
          <button className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50">
            Back
          </button>
        </Link>
      </div>
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
        <div className={`${
          !rsoListView
            ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
            : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
          }`}
        >
              {' '}
              <button onClick={() => {toggleRSOsListView();}}>View RSOs</button>
            </div>
          </div>
        <div className="px-4 font-bold text-2xl">
        <div className={`${
          !createRSOView
            ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
            : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
          }`}
        >
              {' '}
              <button onClick={() => {toggleCreateRSOView();}}>Create RSO</button>
            </div>
        </div>
        <div className="px-4 font-bold text-2xl">
            <div
              className={`${
                !approvalRSOView
                  ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                  : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
              }`}
            >
              <button onClick={() => {toggleApprovalsView();}}>Approvals</button>
            </div>
          </div>
      </div>
      
      <div className={`${rsoListView ? 'py-10' : 'hidden'}`}>
          <RSOSListView rsos={rsos} />
      </div>
      <div className={`${createRSOView ? '' : 'hidden'}`}>
          <RSOCreateView />
      </div>
    </div>
  );
  }
};

export default RSOs;
