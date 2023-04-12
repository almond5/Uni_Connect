import { getSession, signOut, useSession } from 'next-auth/react';
import LoginView from '../components/loginView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../lib/prismadb';
import EventsListView from '@/components/events/eventsListView';
import EventsCreateView from '@/components/events/superAdminCreateEventView';
import { Event, RSO, University, User } from '@prisma/client';
import AdminEventsCreateView from '@/components/events/adminCreateEventView';
import ApprovalsEventsListView from '@/components/events/approvalsListView';

const Roles = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const currUser = session?.user;

  try {
    let events: any = [];
    let approvals: any = null;
    let rsos: any = [];
    let unis = null;

    let user: any =
      await prisma.$queryRaw`SELECT term_project.User.id, term_project.User.name, 
      term_project.User.email, term_project.User.emailVerified, term_project.User.image, 
      term_project.User.role, term_project.User.universityId FROM term_project.User WHERE 
      term_project.User.email = ${currUser?.email!}`;

    user = user[0];

    if (user?.role === Roles.SUPERADMIN) {

      let eventFind: any =
        await prisma.$queryRaw`SELECT term_project.Event.id, term_project.Event.name, term_project.Event.category, 
        term_project.Event.description, term_project.Event.time, term_project.Event.date, term_project.Event.phone_no, 
        term_project.Event.email, term_project.Event.type, term_project.Event.feedbackId, term_project.Event.eventlocationId, 
        term_project.Event.universityId, term_project.Event.rSOId, term_project.Event.approved FROM term_project.Event 
        WHERE term_project.Event.approved = 'TRUE'`;

      for (let i = 0; i < eventFind.length; i++) {
        let eventLocation: any =
          await prisma.$queryRaw`SELECT term_project.EventLocation.id, term_project.EventLocation.name, 
          term_project.EventLocation.latitude, term_project.EventLocation.longitude, term_project.EventLocation.eventId FROM 
          term_project.EventLocation WHERE term_project.EventLocation.eventId = ${eventFind[i].id}`;

        let comments: any =
          await prisma.$queryRaw`SELECT term_project.Comment.id, 
        term_project.Comment.comment, term_project.Comment.feedbackId, term_project.Comment.author, 
        term_project.Comment.email, term_project.Comment.userId FROM term_project.Comment WHERE 
        term_project.Comment.feedbackId = ${eventFind[i].feedbackId}`;

        let ratings: any =
          await prisma.$queryRaw`SELECT term_project.Rating.id, 
        term_project.Rating.rating, term_project.Rating.feedbackId, term_project.Rating.userId 
        FROM term_project.Rating WHERE term_project.Rating.feedbackId = ${eventFind[i].feedbackId}`;

        const eventObj = eventFind[i];
        const eventLocObj = eventLocation[0];
        const commentsObj = comments;
        const ratingsObj = ratings;

        let eventObjToPush: any = null;

        if (
          (commentsObj === undefined && ratingsObj === undefined) ||
          (commentsObj === null && ratingsObj === null) ||
          (commentsObj.length === 0 && ratingsObj.length === 0)
        ) {
          eventObjToPush = { eventObj, eventLocObj };
        } else if (
          commentsObj === undefined ||
          commentsObj === null ||
          commentsObj.length === 0
        ) {
          eventObjToPush = { eventObj, eventLocObj, ratingsObj };
        } else if (
          ratingsObj === undefined ||
          ratingsObj === null ||
          ratingsObj.length === 0
        ) {
          eventObjToPush = { eventObj, eventLocObj, commentsObj };
        } else {
          eventObjToPush = {
            eventObj,
            eventLocObj,
            commentsObj,
            ratingsObj,
          };
        }
        events.push(eventObjToPush);
        console.log(eventObjToPush);
      }

      // rsos = await prisma.rSO.findMany({
      //   where: {},
      // });

      rsos = await prisma.$queryRaw`SELECT term_project.RSO.id, term_project.RSO.name, term_project.RSO.adminID, term_project.RSO.uniId, term_project.RSO.description FROM term_project.RSO WHERE 1=1`
      console.log(rsos)
    }

    if (user?.role === Roles.ADMIN || user?.role === Roles.STUDENT) {
      // let publicEvents = await prisma.event.findMany({
      //   where: {
      //     type: 'PUBLIC',
      //     approved: 'TRUE',
      //   },
      //   include: {
      //     eventlocation: true,
      //     feedback: {
      //       include: { comments: true, ratings: true },
      //     },
      //   },
      // });

      // let privateEvents = await prisma.event.findMany({
      //   where: {
      //     type: 'PRIVATE',
      //     universityId: user!.universityId!,
      //   },
      //   include: {
      //     eventlocation: true,
      //     feedback: {
      //       include: { comments: true, ratings: true },
      //     },
      //   },
      // });

      // privateEvents = privateEvents.concat(publicEvents);
      // events = privateEvents;

      if (
        !(
          user.Member === null ||
          user.Member === undefined ||
          user.Member.length === 0
        )
      ) {
        // for (var member of user?.Member!) {
        //   if (member.approved === 'TRUE') {
        //     let rsoEvents = await prisma.event.findMany({
        //       where: {
        //         type: 'RSO_EVENT',
        //         rSOId: member.rsoId,
        //       },
        //       include: {
        //         eventlocation: true,
        //         feedback: {
        //           include: { comments: true, ratings: true },
        //         },
        //       },
        //     });
        //     let tempRsos = await prisma.rSO.findMany({
        //       where: {
        //         id: member.rsoId,
        //       },
        //     });
        //     privateEvents = privateEvents.concat(rsoEvents);
        //     if (rsos === null) rsos = tempRsos;
        //     else rsos = rsos!.concat(tempRsos);
        //   }
        // }
        // events = privateEvents;
      }

      // unis = await prisma.university.findMany({
      //   where: { id: user!.uni?.id },
      // });
    }

    // const approvals = await prisma.event.findMany({
    //   where: {
    //     approved: 'FALSE',
    //   },
    // });

    return {
      props: {
        eventsFromDB: events,
        unisFromDB: unis,
        approvalsFromDB: approvals,
        rsosFromDB: rsos,
        user: user,
      },
    };
  } catch (error) {
    const events = null;
    const unisFromDB = null;
    const approvals = null;
    const rsosFromDB = null;
    const user = null;

    console.log(error);

    return {
      props: {
        eventsFromDB: events,
        unisFromDB: unisFromDB,
        approvalsFromDB: approvals,
        rsosFromDB: rsosFromDB,
        user: user,
      },
    };
  }
}

const Events = ({
  eventsFromDB,
  unisFromDB,
  approvalsFromDB,
  rsosFromDB,
  userFromDb,
}: {
  eventsFromDB: any;
  unisFromDB: any;
  approvalsFromDB: any;
  rsosFromDB: any;
  userFromDb: any;
}) => {
  const [events] = useState<any[]>(eventsFromDB);
  const [unis] = useState<University[]>(unisFromDB);
  const [eventApprovals] = useState<Event[]>(approvalsFromDB);
  const [rsos] = useState<RSO[]>(rsosFromDB);
  const [user] = useState<User>(userFromDb);

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
  }, []);

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
};

export default Events;
