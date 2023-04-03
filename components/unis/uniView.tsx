import React, { useState } from 'react';

const UniView = (props: { university: any }) => {
  const [deleteModalView, setDeleteModalView] = useState(false);
  const [editModalView, setEditModalView] = useState(false);
  const [del, setDeleted] = useState(false);
  const university = props.university;

  return (
    <div className="py-[0.8rem]">
      <div
        className="h-[22rem] outline bg-stone-50
            p-7 rounded-lg"
      >
        <div className="h-0 min-h-[78%]">
          <div className="mb-2 mt-2 text-lg font-bold">{university.name}</div>
          <div className="flex flex-col text-left">
            <div className="flex">
              <div className="font-bold">Location:&nbsp;</div>
              {/* <div> {university.location.name}</div> */}
            </div>
          </div>
          <p className="mb-4 text-md text-left break-all">
            <div className="font-bold">Description:&nbsp;</div>
            {university.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniView;
