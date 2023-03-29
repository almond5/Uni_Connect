import React, { useState } from 'react';

const SingleEventView = (props: { event: any }) => {
  const [deleteModalView, setDeleteModalView] = useState(false);
  const [editModalView, setEditModalView] = useState(false);
  const [del, setDeleted] = useState(false);
  const event = props.event;

  return (
    <div className={`${del ? 'hidden' : 'py-[0.6rem]'}`}>
      <div className={`${deleteModalView ? '' : 'hidden'}`}>
        {/* <DeleteModal
          setDeleteModalView={setDeleteModalView}
          notes={note}
          setDeleted={setDeleted}
          count={props.count}
          setCount={props.counter}
        /> */}
      </div>
      <div className={`${editModalView ? '' : 'hidden'}`}>
        {/* <EditModal
          setEditModalView={setEditModalView}
          notes={note}
        /> */}
      </div>
      <div
        className="h-[17rem] outline bg-stone-50
            p-7 rounded-lg"
      >
        <div className="flex justify-between">
          <div>
            <button
              className="p-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
          hover:text-gray-800 text-Lg"
              onClick={() => setEditModalView(true)}
            >
              {/* <FaEdit style={{ fontSize: '25px' }} /> */}
              Edit
            </button>
            <button
            className="px-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
            hover:text-gray-800 text-Lg"
              onClick={() => setDeleteModalView(true)}
            >
              {/* <FaTrashAlt style={{ fontSize: '25px' }} /> */}
              Delete
            </button>
          </div>

          <div className="text-right break-all"></div>
          {event.date}
          {event.time}
        </div>
        <div className="mb-1 text-lg font-bold">{event.name}</div>
        <p className="mb-4 text-md text-left break-all">{event.description}</p>
      </div>
    </div>
  );
};

export default SingleEventView;
