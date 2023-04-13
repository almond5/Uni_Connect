import { signOut, useSession, getSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import RSOCreateView from '@/components/rsos/rsoCreateView';
import { Member, RSO, Role } from '@prisma/client';
import RSOJoinListView from '@/components/rsos/rsosJoinListView';
import RSOSLeaveListView from '@/components/rsos/rsosLeaveListView';
import RSOSListView from '@/components/rsos/rsosListView';
import RSORequestsView from '@/components/rsos/rsoRequestsView';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const currUser = session?.user;

  try {
    let rsos = null;
    let mems: any = [];
    let rsosToLeave: ((RSO & { members: Member[] }) | null)[] = [];
    let rsosToJoin: any = [];
    let rsosPending: any = [];
    let allRSOS: any = [];

    const user = await prisma.user.findFirst({
      where: {
        email: currUser?.email!,
      },
      include: { Member: true, uni: true },
    });

    if (user?.role === Roles.SUPERADMIN) {
      rsos = await prisma.rSO.findMany({ where: {} });
    } else {
      for (let i = 0; i < user?.Member!.length!; i++) {
        if (user?.Member![i].approved === 'APPROVED') {
          const rso = await prisma.rSO.findFirst({
            where: { id: user?.Member![i].rsoId },
            include: { members: true },
          });

          if (user?.Member![i].isAdmin === 'TRUE')
            for (let i = 0; i < rso?.members!.length!; i++)
              if (rso?.members![i].approved === 'PENDING')
                mems.push(rso?.members[i]);

          rsosToLeave.push(rso);
        } else if (user?.Member![i].approved === 'PENDING') {
          const rso = await prisma.rSO.findFirst({
            where: { id: user?.Member![i].rsoId },
          });
          rsosPending.push(rso);
        }
      }

      allRSOS = await prisma.rSO.findMany({ where: {
        uniId: user?.uni!.id,
      } });

      rsosToJoin = allRSOS.filter(
        (objectOne: { id: string }) =>
          !rsosToLeave.some((objectTwo) => objectOne.id === objectTwo!.id)
      );

      rsosToJoin = rsosToJoin.filter(
        (objectOne: { id: any }) =>
          !rsosPending.some((objectTwo: any) => objectOne.id === objectTwo!.id)
      );
    }

    const role = user?.role;

    return {
      props: {
        rsosFromDB: rsos,
        rsosToJoinFromDB: rsosToJoin,
        rsosToLeaveFromDB: rsosToLeave,
        membersFromDB: mems,
        roleFromDB: role,
      },
    };
  } catch (error) {
    const rsos = null;
    const mems = null;
    const rsosToLeave = null;
    const rsosToJoin = null;
    const role = null;

    return {
      props: {
        rsosFromDB: rsos,
        rsosToJoinFromDB: rsosToJoin,
        rsosToLeaveFromDB: rsosToLeave,
        membersFromDB: mems,
        roleFromDB: role,
      },
    };
  }
}

const RSOs = ({
  rsosFromDB,
  membersFromDB,
  rsosToJoinFromDB,
  rsosToLeaveFromDB,
  roleFromDB,
}: {
  rsosFromDB: any;
  membersFromDB: any;
  rsosToJoinFromDB: any;
  rsosToLeaveFromDB: any;
  roleFromDB: any;
}) => {
  const [rsos] = useState<RSO[]>(rsosFromDB);
  const [rsosToJoin] = useState<RSO[]>(rsosToJoinFromDB);
  const [rsosToLeave] = useState<RSO[]>(rsosToLeaveFromDB);
  const [members] = useState<Member[]>(membersFromDB);
  const [userRole] = useState<Role>(roleFromDB);

  const { status: sesh } = useSession();
  const [adminView, setAdminView] = useState(false);
  const [superAdminView, setSuperAdminView] = useState(false);

  const [rsoListView, setRSOListView] = useState(false);
  const [createRSOView, setCreateRSOView] = useState(false);
  const [approvalRSOView, setApprovalRSOView] = useState(false);
  const [rsoJoinListView, setRSOJoinListView] = useState(false);
  const [studentView, setStudentView] = useState(false);

  const toggleRSOsListView = () => {
    rsoListView ? setRSOListView(false) : setRSOListView(true);
    setCreateRSOView(false);
    setApprovalRSOView(false);
    setRSOJoinListView(false);
  };

  const toggleCreateRSOView = () => {
    createRSOView ? setCreateRSOView(false) : setCreateRSOView(true);
    setRSOListView(false);
    setApprovalRSOView(false);
    setRSOJoinListView(false);
  };

  const toggleApprovalsView = () => {
    approvalRSOView ? setApprovalRSOView(false) : setApprovalRSOView(true);
    setRSOListView(false);
    setCreateRSOView(false);
    setRSOJoinListView(false);
  };

  const toggleJoinRSOsListView = () => {
    rsoJoinListView ? setRSOJoinListView(false) : setRSOJoinListView(true);
    setRSOListView(false);
    setCreateRSOView(false);
    setApprovalRSOView(false);
  };

  useEffect(() => {
    if (userRole.includes(Roles.STUDENT)) setStudentView(true);
    else if (userRole.includes(Roles.SUPERADMIN)) setSuperAdminView(true);
    else if (userRole.includes(Roles.ADMIN)) setAdminView(true);
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
      <div
        className={`${
          adminView || studentView ? 'flex justify-center' : 'hidden'
        }`}
      >
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
              !rsoJoinListView
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
      <div className={`${superAdminView ? '' : 'hidden'}`}>
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
                View All RSOs
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${rsoListView && superAdminView ? '' : 'hidden'}`}>
        <RSOSListView rsos={rsos} />
      </div>
      <div className={`${rsoListView && !superAdminView ? '' : 'hidden'}`}>
        <RSOSLeaveListView rsosToLeave={rsosToLeave} />
      </div>
      <div className={`${createRSOView && !superAdminView ? '' : 'hidden'}`}>
        <RSOCreateView />
      </div>
      <div className={`${approvalRSOView ? '' : 'hidden'}`}>
        <RSORequestsView members={members} />
      </div>
      <div className={`${rsoJoinListView && !superAdminView ? '' : 'hidden'}`}>
        <RSOJoinListView rsosToJoin={rsosToJoin} />
      </div>
    </div>
  );
};

export default RSOs;
