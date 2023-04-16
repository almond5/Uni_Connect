import React from 'react';

const RSORequestView = (props: { member: any }) => {
  const member = props.member;
  const [memId, setMemId] = React.useState(member.id);

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleDecline = async () => {
    await declined(memId);
    await timeout(1000);
    window.location.reload();
  };

  const handleAccept = async () => {
    await accepted(memId);
    await timeout(1000);
    window.location.reload();
  };

  const accepted = async (request: { memId: string | undefined | null }) => {
    const response = await fetch('/api/rsoRequestAccept', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    const message  = await response.json();

    if (message === 'This RSO has been activated.') {
      alert(message);
      return;
    }
  };

  const declined = async (request: { memId: string | undefined | null }) => {
    const response = await fetch('/api/rsoRequestDecline', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    const message = await response.json();
    return
  };

  return (
    <div className="py-[0.6rem]">
      <div
        className="h-[12rem] outline bg-stone-50
            p-7 rounded-lg"
      >
        <div className="flex justify-between">
          <div>
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800 mr-2"
              onClick={() => handleAccept()}
            >
              Accept
            </button>
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
              onClick={() => handleDecline()}
            >
              Decline
            </button>
          </div>

          <div className="text-right break-all"></div>
        </div>
        <div className="mt-4 mb-1 text-lg font-bold">{member.name}</div>
        <div className="mb-1 text-lg font-"> is requesting to join</div>
        <div className="mb-1 text-lg font-bold">{member.rsoName}</div>
      </div>
    </div>
  );
};

export default RSORequestView;
