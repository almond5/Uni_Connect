import { signOut, useSession, getSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import RSOSListView from '@/components/rsos/rsosListView';
import RSOCreateView from '@/components/rsos/createRSOView';
import { useDateRangeValidation } from '@mui/x-date-pickers-pro/internal/hooks/validation/useDateTimeRangeValidation';
import { User } from '@prisma/client';


const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const user = session?.user;

  try {
    const rsos = await prisma.rSO.findMany({
      where: {},
    });

    const userList = await prisma.user.findMany({
      where: {}
    })
    
    return {
      props: {
        rsosFromDB: rsos,
        userFromDB: user,
        usersFromDB: userList
      },
    };
  } catch(error) {
    const rsos = null;
    const userList = await prisma.user.findMany({
      where: {}
    })

    console.log(userList)

    return {
      props: {
        rsosFromDB: rsos,
        userFromDB: user,
        usersFromDB: userList
      },
    };
  }
}

const RSOs = ({ rsosFromDB, userFromDB, usersFromDB } : { rsosFromDB: any, userFromDB: any, usersFromDB: any}) => {
  const [rsos] = useState<Event[]>(rsosFromDB);
  const { status: sesh } = useSession();
  const user = useState(userFromDB);
  const [users] = useState<User[]>(usersFromDB);
  
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
          <RSOCreateView user = {user} users ={users}/>
      </div>
    </div>
  );
  }
};

export default RSOs;
