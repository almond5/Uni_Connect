import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import EventsListView from '@/components/events/eventsListView';
import EventsCreateView from '@/components/events/eventCreateSuperAdminView';
import { Event, RSO, Role, University } from '@prisma/client';
import AdminEventsCreateView from '@/components/events/eventCreateAdminView';
import ApprovalsEventsListView from '@/components/events/eventPublicApprovalsListView';
import router from 'next/router';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const currUser = session?.user;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: currUser?.email!,
      },
      include: { Member: true, uni: true },
    });

    let approvals = null;
    let events = null;
    let rsos = null;
    let unis = null;

    if (user?.role === Roles.SUPERADMIN) {
      events = await prisma.event.findMany({
        where: {
          approved: 'TRUE',
        },
        include: {
          eventlocation: true,
          feedback: {
            include: { comments: true, ratings: true },
          },
        },
      });

      approvals = await prisma.event.findMany({
        where: {
          type: 'PUBLIC',
          approved: 'FALSE',
        },
      });

      rsos = await prisma.rSO.findMany({
        where: {
          active: 'TRUE',
        },
      });

      unis = await prisma.university.findMany({
        where: {},
      });
    }

    if (user?.role === Roles.ADMIN || user?.role === Roles.STUDENT) {
      let publicEvents = await prisma.event.findMany({
        where: {
          type: 'PUBLIC',
          approved: 'TRUE',
        },
        include: {
          eventlocation: true,
          feedback: {
            include: { comments: true, ratings: true },
          },
        },
      });

      let privateEvents = await prisma.event.findMany({
        where: {
          type: 'PRIVATE',
          universityId: user!.universityId!,
        },
        include: {
          eventlocation: true,
          feedback: {
            include: { comments: true, ratings: true },
          },
        },
      });

      privateEvents = privateEvents.concat(publicEvents);
      events = privateEvents;

      if (
        !(
          user.Member === null ||
          user.Member === undefined ||
          user.Member.length === 0
        )
      ) {
        for (var member of user?.Member!) {
          let rsoEvents = await prisma.event.findMany({
            where: {
              type: 'RSO_EVENT',
              rSOId: member.rsoId,
            },
            include: {
              eventlocation: true,
              feedback: {
                include: { comments: true, ratings: true },
              },
            },
          });

          let tempRsos = await prisma.rSO.findMany({
            where: {
              id: member.rsoId,
              active: 'TRUE',
            },
          });

          privateEvents = privateEvents.concat(rsoEvents);

          if (rsos === null) rsos = tempRsos;
          else rsos = rsos!.concat(tempRsos);
        }

        events = privateEvents;
      }

      unis = await prisma.university.findMany({
        where: { id: user!.uni?.id },
      });
    }

    const role = user?.role;

    return {
      props: {
        eventsFromDB: events,
        unisFromDB: unis,
        approvalsFromDB: approvals,
        rsosFromDB: rsos,
        roleFromDB: role,
      },
    };
  } catch (error) {
    const events = null;
    const unisFromDB = null;
    const approvals = null;
    const rsosFromDB = null;
    const roleFromDB = null;

    return {
      props: {
        eventsFromDB: events,
        unisFromDB: unisFromDB,
        approvalsFromDB: approvals,
        rsosFromDB: rsosFromDB,
        roleFromDB: roleFromDB,
      },
    };
  }
}

const Events = ({
  eventsFromDB,
  unisFromDB,
  approvalsFromDB,
  rsosFromDB,
  roleFromDB,
}: {
  eventsFromDB: any;
  unisFromDB: any;
  approvalsFromDB: any;
  rsosFromDB: any;
  roleFromDB: any;
}) => {
  const [events] = useState<Event[]>(eventsFromDB);
  const [unis] = useState<University[]>(unisFromDB);
  const [eventApprovals] = useState<Event[]>(approvalsFromDB);
  const [rsos] = useState<RSO[]>(rsosFromDB);
  const [user] = useState<Role>(roleFromDB);
  const [studentView, setStudentView] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [superAdminView, setSuperAdminView] = useState(false);
  const [eventListView, setEventListView] = useState(false);
  const [createEventsView, setCreateEventsView] = useState(false);
  const [approvalEventView, setApprovalEventView] = useState(false);
  const { status: sesh } = useSession();

  useEffect(() => {
    if (user !== null || user !== undefined) {
      if (user.includes(Roles.STUDENT)) setStudentView(true);
      else if (user.includes(Roles.SUPERADMIN)) setSuperAdminView(true);
      else if (user.includes(Roles.ADMIN)) setAdminView(true);
    }
  }, []);

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/login');
  }

  const toggleEventsListView = () => {
    eventListView ? setEventListView(false) : setEventListView(true);
  };

  const toggleCreateEventsView = () => {
    createEventsView ? setCreateEventsView(false) : setCreateEventsView(true);
  };

  const toggleApprovalsView = () => {
    approvalEventView
      ? setApprovalEventView(false)
      : setApprovalEventView(true);
  };

  if (sesh === 'authenticated') {
    if (adminView) {
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
                  !eventListView
                    ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                    : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
                }`}
              >
                {' '}
                <button
                  onClick={() => {
                    toggleEventsListView();
                    setCreateEventsView(false);
                    setApprovalEventView(false);
                  }}
                >
                  View Events
                </button>
              </div>
            </div>
            <div className="px-4 font-bold text-2xl">
              <div
                className={`${
                  !createEventsView
                    ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                    : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
                }`}
              >
                {' '}
                <button
                  onClick={() => {
                    toggleCreateEventsView();
                    setEventListView(false);
                    setApprovalEventView(false);
                  }}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
          <div className={`${eventListView ? '' : 'hidden'}`}>
            <EventsListView events={events} role={'ADMIN'} user={user} />
          </div>
          <div className={`${createEventsView ? '' : 'hidden'}`}>
            <AdminEventsCreateView unis={unis} rsos={rsos} />
          </div>
        </div>
      );
    } else if (studentView) {
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
                  !eventListView
                    ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                    : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
                }`}
              >
                {' '}
                <button
                  onClick={() => {
                    toggleEventsListView();
                    setCreateEventsView(false);
                    setApprovalEventView(false);
                  }}
                >
                  View Events
                </button>
              </div>
            </div>
          </div>
          <div className={`${eventListView ? '' : 'hidden'}`}>
            <EventsListView events={events} role={'STUDENT'} user={user} />
          </div>
        </div>
      );
    } else if (superAdminView) {
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
                  !eventListView
                    ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                    : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
                }`}
              >
                {' '}
                <button
                  onClick={() => {
                    toggleEventsListView();
                    setCreateEventsView(false);
                    setApprovalEventView(false);
                  }}
                >
                  View Events
                </button>
              </div>
            </div>
            <div className="px-4 font-bold text-2xl">
              <div
                className={`${
                  !createEventsView
                    ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                    : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
                }`}
              >
                {' '}
                <button
                  onClick={() => {
                    toggleCreateEventsView();
                    setEventListView(false);
                    setApprovalEventView(false);
                  }}
                >
                  Create Event
                </button>
              </div>
            </div>
            <div className="px-4 font-bold text-2xl">
              <div
                className={`${
                  !approvalEventView
                    ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                    : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
                }`}
              >
                <button
                  onClick={() => {
                    toggleApprovalsView();
                    setEventListView(false);
                    setCreateEventsView(false);
                  }}
                >
                  Approvals
                </button>
              </div>
            </div>
          </div>
          <div className={`${eventListView ? '' : 'hidden'}`}>
            <EventsListView events={events} role={'SUPERADMIN'} user={user} />
          </div>
          <div className={`${createEventsView ? '' : 'hidden'}`}>
            <EventsCreateView unis={unis} rsos={rsos} />
          </div>
          <div className={`${approvalEventView ? '' : 'hidden'}`}>
            <ApprovalsEventsListView events={eventApprovals} />
          </div>
        </div>
      );
    }
  }
};

export default Events;
