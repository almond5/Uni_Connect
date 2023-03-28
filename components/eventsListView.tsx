import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import EventView from './eventView';
import Login from './loginView';

const EventsListView = (props: { events: any }) => {
  const [deleteModalView, setDeleteModalView] = useState(false);
  const [editModalView, setEditModalView] = useState(false);
  const [del, setDeleted] = useState(false);
  const { status: sesh } = useSession();
  const events = props.events;

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <Login />;
  }

  if (events === null || events === undefined || events.length === 0)
    return (
      <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
        There are no events!
      </div>
    );
  else {
    return (
      <div
        className="py-[4.4rem] flex-col text-center mx-auto max-w-sm xs:max-w-sm 
      sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid md:grid-cols-1 
      lg:grid-cols-1"
      >
        {' '}
        {events.map((event: any) => (
          <EventView event={event}></EventView>
        ))}
      </div>
    );
  }
};

export default EventsListView;
