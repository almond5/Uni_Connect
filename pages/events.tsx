import { getSession, signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import EventsListView from '@/components/events/eventsListView';
import EventsCreateView from '@/components/events/superAdminCreateEventView';
import { EventApproval, University } from '@prisma/client';
import AdminEventsCreateView from '@/components/events/adminCreateEventView';
import ApprovalsEventsListView from '@/components/events/approvalsListView';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps() {
  try {
    const events = await prisma.event.findMany({
      where: {},
    });

    const unis = await prisma.university.findMany({
      where: {},
    });

    const approvals = await prisma.eventApproval.findMany({
      where: {},
    });

    return {
      props: {
        eventsFromDB: events,
        unisFromDB: unis,
        approvalsFromDB: approvals,
      },
    };
  } catch (error) {
    const events = null;
    const unisFromDB = null;
    const approvals = null;

    return {
      props: {
        eventsFromDB: events,
        unisFromDB: unisFromDB,
        approvalsFromDB: approvals,
      },
    };
  }
}


const Events = ({
  eventsFromDB,
  unisFromDB,
  approvalsFromDB,
}: {
  eventsFromDB: any;
  unisFromDB: any;
  approvalsFromDB: any;
}) => {
  const [events] = useState<Event[]>(eventsFromDB);
  const [unis] = useState<University[]>(unisFromDB);
  const [eventApprovals] = useState<EventApproval[]>(approvalsFromDB);

  const [studentView, setStudentView] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [superAdminView, setSuperAdminView] = useState(false);

  const [eventListView, setEventListView] = useState(false);
  const [createEventsView, setCreateEventsView] = useState(false);
  const [approvalEventView, setApprovalEventView] = useState(false);

  const { status: sesh } = useSession();

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

  useEffect(() => {
    if (window?.location.search.includes(Roles.STUDENT)) setStudentView(true);
    else if (window?.location.search.includes(Roles.SUPERADMIN))
      setSuperAdminView(true);
    else if (window?.location.search.includes(Roles.ADMIN)) setAdminView(true);
  });

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <LoginView />;
  }

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
        <div className={`${eventListView ? 'py-10' : 'hidden'}`}>
          <EventsListView events={events} />
        </div>
        <div className={`${createEventsView ? '' : 'hidden'}`}>
          <AdminEventsCreateView unis={unis} />
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
        <div className={`${eventListView ? 'py-10' : 'hidden'}`}>
          <EventsListView events={events} />
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
        <div className={`${eventListView ? 'py-10' : 'hidden'}`}>
          <EventsListView events={events} />
        </div>
        <div className={`${createEventsView ? '' : 'hidden'}`}>
          <EventsCreateView unis={unis} />
        </div>
        <div className={`${approvalEventView ? 'py-10' : 'hidden'}`}>
          <ApprovalsEventsListView approvals={eventApprovals} />
        </div>
      </div>
    );
  }
};

export default Events;
