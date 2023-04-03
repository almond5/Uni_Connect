import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const CommentCreateView = (props: { event: any }) => {
  const [body, setBody] = useState('');
  const { data: sesh } = useSession();
  const event = props.event;

  const submitComment = async (comment: {
    email: string | undefined | null;
    event: Event | undefined | null;
    body: string | undefined | null;
  }) => {
    const response = await fetch('/api/eventComment', {
      method: 'POST',
      body: JSON.stringify(comment),
    });

    const data = await response.json();
    console.log(data);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const email = sesh?.user?.email;
    const comment = {
      email,
      event,
      body,
    };
    await submitComment(comment);
    await timeout(1000);
    window.location.reload();
    setBody('');
  };

  return (
    <div className="flex-col text-center">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-md text-md text-left xs:max-w-md sm:max-w-md 
        md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md"
        >
          <div className="mb-3.5 text-md">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-md"
            >
              Comment:
            </div>
            <div>
              <textarea
                maxLength={322}
                value={body}
                onChange={(e) => [setBody(e.target.value)]}
                required
                rows={7}
                cols={1}
                className="block p-2 w-full text-md text-gray-900 
                bg-neutral-50 rounded-lg border-[0.175rem] 
                  rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>
        </div>
        <button>
          <div
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
          >
            Submit
          </div>
        </button>
      </form>
    </div>
  );
};

export default CommentCreateView;
