import React, { useState } from 'react';

const ApprovalEventView = (props: { event: any }) => {
  const event = props.event;
  const [id, setId] = useState(event.id);
  
  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleAccept = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const approval = { id };
    await accepted(approval);
    await await timeout(1000);
    window.location.reload();
    setId('');
  };

  const handleDecline = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const approval = { id };
    await declined(approval);
    await timeout(1000);
    window.location.reload();
    setId('');
  };

  const accepted = async (approval: { id: string | undefined | null }) => {
    const response = await fetch('/api/acceptApproval', {
      method: 'POST',
      body: JSON.stringify(approval),
    });

    const data = await response.json();
    console.log(data);
  };

  const declined = async (approval: { id: string | undefined | null }) => {
    const response = await fetch('/api/eventDelete', {
      method: 'POST',
      body: JSON.stringify(approval),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="py-[0.6rem]">
      <div
        className="h-[17rem] outline bg-stone-50
            p-7 rounded-lg"
      >
        <div className="flex justify-between">
          <div>
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800 mr-2"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
              onClick={handleDecline}
            >
              Decline
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

export default ApprovalEventView;
