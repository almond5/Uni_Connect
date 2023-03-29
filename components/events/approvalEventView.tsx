import React, { useState } from 'react';

const ApprovalEventView = (props: { approval: any }) => {
  const [del, setDeleted] = useState(false);
  const approval = props.approval;

  const handleDecline = async () => {
    await accepted(approval);
    await timeout(1000);
    window.location.reload();  
  };

  const handleAccept = async () => {
    await accepted(approval);
    await timeout(1000);
    window.location.reload();
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const accepted = async (approval: {
    title: string | undefined | null;
    body: string | undefined | null;
    type: string | undefined | null;
    date: Date | undefined | null;
    phoneNumber: number | undefined | null;
    lat: number | undefined | null;
    lng: number | undefined | null;
    locationName: string | undefined | null;
    id: string | undefined | null
  }) => {
    const response = await fetch('/api/eventApprovalAccepted', {
      method: 'POST',
      body: JSON.stringify(approval),
    });

    const data = await response.json();
    console.log(data);
  };
  

  const declined = async (approval: {
    id: string | undefined | null
  }) => {
    const response = await fetch('/api/eventApprovalDeclined', {
      method: 'POST',
      body: JSON.stringify(approval),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={`${del ? 'hidden' : 'py-[0.6rem]'}`}>
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
          {approval.date}
          {approval.time}
        </div>
        <div className="mb-1 text-lg font-bold">{approval.name}</div>
        <p className="mb-4 text-md text-left break-all">
          {approval.description}
        </p>
      </div>
    </div>
  );
};

export default ApprovalEventView;
