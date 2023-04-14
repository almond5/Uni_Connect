import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const RSOLeaveView = (props: { rso: any }) => {
  const rso = props.rso;
  const { data: sesh } = useSession();
  const [rsoId, setRsoId] = useState(rso.id);
  const [userEmail, setUserEmail] = useState(sesh?.user?.email!);

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleLeave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const rsoLeave = {
      rsoId,
      userEmail,
    };

    await submitLeave(rsoLeave);
    await await timeout(1000);
    window.location.reload();
    setRsoId('');
  };

  const submitLeave = async (rsoLeave: {
    rsoId: string | undefined | null;
    userEmail: string | undefined | null;
  }) => {
    const response = await fetch('/api/rsoLeave', {
      method: 'POST',
      body: JSON.stringify(rsoLeave),
    });

    const data = await response.json();
    if (data !== null && data === 'This RSO has been deactivated.')
      alert(data);
  };

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
        <div className="flex flex-col mt-10">
          <button
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
            onClick={handleLeave}
          >
            Leave RSO
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSOLeaveView;
