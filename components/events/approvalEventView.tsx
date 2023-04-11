import React, { useState } from 'react';

const ApprovalEventView = (props: { event: any }) => {
  const event = props.event;

  const handleDecline = async () => {
    await declined(event.id);
    await timeout(1000);
    window.location.reload();
  };

  const handleAccept = async () => {
    await accepted(event.id);
    await timeout(1000);
    window.location.reload();
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const accepted = async (approval: { id: string | undefined | null }) => {
    const response = await fetch('/api/acceptApproval', {
      method: 'POST',
      body: JSON.stringify(approval),
    });

    const data = await response.json();
    console.log(data);
  };

  const declined = async (event: { id: string | undefined | null }) => {
    const response = await fetch('/api/eventDelete', {
      method: 'POST',
      body: JSON.stringify(event),
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
              className="p-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
          hover:text-gray-800 text-Lg"
              onClick={() => handleAccept()}
            >
              Accept
            </button>
            <button
              className="px-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400
            hover:text-gray-800 text-Lg"
              onClick={() => handleDecline()}
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
