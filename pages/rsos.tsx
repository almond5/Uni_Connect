import { signOut, useSession, getSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import RSOSListView from '@/components/rsos/rsosListView';
import RSOCreateView from '@/components/rsos/createRSOView';
import { Member, RSO } from '@prisma/client';
import RSORequestView from '@/components/rsos/rsosRequestView';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const currUser = session?.user;

  try {
    let rsos = [];
    let mems = [];

    const user = await prisma.user.findFirst({
      where: {
        email: currUser?.email!,
      },
      include: { Member: true, uni: true },
    });

    if (user?.role === Roles.SUPERADMIN) {
      rsos = await prisma.rSO.findMany({ where: {} });
    } else if (user?.role === Roles.ADMIN) {
      for (let i = 0; i < user?.Member!.length!; i++) {
        if (user?.Member![i].approved === 'TRUE') {
          const rso = await prisma.rSO.findFirst({
            where: { id: user?.Member![i].rsoId },
            include: { members: true },
          });

          rsos.push(rso);

          if (user?.Member![i].isAdmin === 'TRUE')
            for (let i = 0; i < rso?.members!.length!; i++)
              if (rso?.members![i].approved === 'FALSE')
                mems.push(rso?.members[i]);
        }
      }
    } else {
      rsos = await prisma.rSO.findMany({
        where: {
          uniId: user?.uni?.id!,
        },
      });
    }

    return {
      props: {
        rsosFromDB: rsos,
        membersFromDB: mems,
      },
    };
  } catch (error) {
    const rsos = null;
    const mems = null;

    return {
      props: {
        rsosFromDB: rsos,
        membersFromDB: mems,
      },
    };
  }
}

const RSOs = ({
  rsosFromDB,
  membersFromDB,
}: {
  rsosFromDB: any;
  membersFromDB: any;
}) => {
  const [rsos] = useState<RSO[]>(rsosFromDB);
  const [members] = useState<Member[]>(membersFromDB);
  const { status: sesh } = useSession();
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
    if (window?.location.search.includes(Roles.ADMIN)) setAdminView(true);
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
          <div
            className={`${
              !rsoListView
                ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            {' '}
            <button
              onClick={() => {
                toggleRSOsListView();
              }}
            >
              View My RSOs
            </button>
          </div>
        </div>
        <div className="px-4 font-bold text-2xl">
          <div
            className={`${
              !rsoListView
                ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            {' '}
            <button
              onClick={() => {
                toggleJoinRSOsListView();
              }}
            >
              Join an RSO
            </button>
          </div>
        </div>
        <div className="px-4 font-bold text-2xl">
          <div
            className={`${
              !createRSOView
                ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
            }`}
          >
            {' '}
            <button
              onClick={() => {
                toggleCreateRSOView();
              }}
            >
              Create RSO
            </button>
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
            <button
              onClick={() => {
                toggleApprovalsView();
              }}
            >
              Requests
            </button>
          </div>
        </div>
      </div>

      <div className={`${rsoListView ? '' : 'hidden'}`}>
        <RSOSListView rsos={rsos} />
      </div>
      <div className={`${createRSOView ? '' : 'hidden'}`}>
        <RSOCreateView />
      </div>
      <div className={`${adminView || superAdminView ? '' : 'hidden'}`}>
        <RSORequestView members={rsos} />
      </div>
    </div>
  );
};

export default RSOs;
