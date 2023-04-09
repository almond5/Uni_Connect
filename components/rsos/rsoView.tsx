import React, { useState } from 'react';

const RSOView = (props: { rso: any }) => {
  const rso = props.rso;

  return (
    <div className="py-[0.8rem]">
      <div
        className="h-[26.5rem] outline bg-stone-50
            p-7 rounded-lg"
      >
        <div className="h-0 min-h-[72%]">
          <div className="mb-2 mt-2 text-lg font-bold">{rso.name}</div>
        </div>
      </div>
    </div>
  );
};

export default RSOView;
