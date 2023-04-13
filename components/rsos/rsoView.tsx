import React from 'react';

const RSOView = (props: { rso: any }) => {
  const rso = props.rso;

  return (
    <div className="py-[0.8rem]">
      <div
        className="h-[22rem] outline bg-stone-50
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
      </div>
    </div>
  );
};

export default RSOView;
