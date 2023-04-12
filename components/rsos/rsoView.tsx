import React, { useState } from 'react';

const RSOView = (props: { rso: any }) => {
  const rso = props.rso;

  return (
    <div className="py-[0.8rem]">
      <div
        className="h-[24rem] outline bg-stone-50
            p-7 rounded-lg"
      >
        <div className="h-0 min-h-[72%]">
          <div className="mb-2 mt-2 text-lg font-bold">{rso.name}</div>
          <div className="flex flex-col text-left"></div>
          <p className="mb-4 text-md text-left break-all">
            <div className="font-bold">Description:&nbsp;</div>
            {rso.description}
          </p>
        </div>
        <div className="flex flex-col mt-2">
          <button
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800 mb-2"
          >
            Join
          </button>
          <button
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSOView;
