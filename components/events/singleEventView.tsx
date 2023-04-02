import React, { useState } from 'react';
import CommentModal from '../commentModalView';
import DeleteModal from './deleteModal';
import EditModal from './editModal';

const SingleEventView = (props: { event: any }) => {
  const [deleteModalView, setDeleteModalView] = useState(false);
  const [editModalView, setEditModalView] = useState(false);
  const [commentModalView, setCommentModalView] = useState(false);
  const [del, setDeleted] = useState(false);
  const event = props.event;
  
  const toggleEditModalView = () => {
    setEditModalView(!editModalView)
  }

  return (
    <div className={`${del ? 'hidden' : 'py-[0.8rem]'}`}>
      <div className={`${commentModalView ? '' : 'hidden'}`}>
        <CommentModal setCommentModalView={setCommentModalView} />
      </div>
      <div className={`${!commentModalView ? '' : 'hidden'}`}>
        <div className={`${deleteModalView ? '' : 'hidden'}`}>
          <DeleteModal setDeleteModalView={setDeleteModalView} event={event} />
        </div>
        <div className={`${editModalView ? '' : 'hidden'}`}>
          <EditModal
          toggleEditModalView={toggleEditModalView}
          event={event}
        />
        </div>

        <div
          className="h-[20rem] outline bg-stone-50
            p-7 rounded-lg"
        >
          <div className="flex justify-between">
            <div>
              <button
                className="p-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
          hover:text-gray-800 text-Lg"
                onClick={() => setEditModalView(true)}
              >
                Edit
              </button>
              <button
                className="px-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
            hover:text-gray-800 text-Lg"
                onClick={() => setDeleteModalView(true)}
              >
                Delete
              </button>
            </div>
            <div className="text-right break-all"></div>
            {event.date}
            {event.time}
          </div>
          <div className="h-0 min-h-[78%]">
            <div className="mb-2 mt-2 text-lg font-bold">{event.name}</div>
            <p className="mb-4 text-md text-left break-all">
              {event.description}
            </p>
          </div>
          <div>
            <button
              className="px-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
            hover:text-gray-800 text-Lg"
              onClick={() => setCommentModalView(true)}
            >
              See Comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventView;
