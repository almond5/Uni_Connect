import React, { useEffect, useState } from 'react';
import CommentModal from './commentModalView';
import DeleteModal from './deleteModal';
import RatingModal from './ratingModalView';

const SingleEventView = (props: { event: any; role: any; user: any }) => {
  const [deleteModalView, setDeleteModalView] = useState(false);
  const [commentModalView, setCommentModalView] = useState(false);
  const [ratingModalView, setRatingModalView] = useState(false);
  const [eventType, setEventType] = useState('');
  const event = props.event;
  const role = props.role;
  const user = props.user;

  // WIP
  useEffect(() => {
    if (event.type === 'RSO_EVENT') setEventType('RSO Event');
    else if (event.type === 'PUBLIC') setEventType('Public Event');
    else if (event.type === 'PRIVATE') setEventType('Private Event');
  });

  if (role !== 'SUPERADMIN') {
    if (event.type === 'PRIVATE' && event.university !== user.university) {
      return <div></div>;
    }

    if (event.type === 'RSO_EVENT') {
      if (!user.rso.contains(event.rso)) {
        return <div></div>;
      }
    }
  }

  return (
    <div className="py-[0.8rem]">
      <div className={`${commentModalView ? '' : 'hidden'}`}>
        <CommentModal
          setCommentModalView={setCommentModalView}
          event={event}
          role={role}
        />
      </div>
      <div className={`${ratingModalView ? '' : 'hidden'}`}>
        <RatingModal
          setRatingModalView={setRatingModalView}
          event={event}
          role={role}
        />
      </div>
      <div
        className={`${!commentModalView && !ratingModalView ? '' : 'hidden'}`}
      >
        <div
          className={`${
            deleteModalView && role === 'SUPERADMIN' ? '' : 'hidden'
          }`}
        >
          <DeleteModal setDeleteModalView={setDeleteModalView} event={event} />
        </div>
        <div
          className="h-[26.5rem] outline bg-stone-50
            p-7 rounded-lg"
        >
          <div className="h-0 min-h-[72%]">
            <div className="mb-2 mt-2 text-lg font-bold">{event.name}</div>
            <div className="flex flex-col text-left">
              <div className="flex">
                <div className="font-bold">Time: &nbsp;</div>
                <div>
                  {event.date}
                  {event.time}
                </div>
              </div>
              <div className="flex">
                <div className="font-bold">Location:&nbsp;</div>
                <div> {event.eventlocation?.name}</div>
              </div>
              <div className="flex">
                <div className="font-bold">Type:&nbsp;</div>
                <div> {eventType} </div>
              </div>
            </div>
            <p className="mb-4 text-md text-left break-all">
              <div className="font-bold">Description:&nbsp;</div>
              {event.description}
            </p>
          </div>
          <div className="flex flex-col mt-7">
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800 mb-2"
              onClick={() => setCommentModalView(true)}
            >
              Comments
            </button>
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
              onClick={() => setRatingModalView(true)}
            >
              Ratings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventView;
