import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingCreateView = (props: { event: any }) => {
  const [ratingVal, setRatingVal] = useState('');
  const [hover, setHover] = useState(0);
  const { data: sesh } = useSession();
  const event = props.event;

  const submitRating = async (rating: {
    email: string | undefined | null;
    event: Event | undefined | null;
    ratingVal: string | undefined | null;
  }) => {
    const response = await fetch('/api/eventRating', {
      method: 'POST',
      body: JSON.stringify(rating),
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
    const rating = {
      email,
      event,
      ratingVal
    };
    await submitRating(rating);
    await timeout(1000);
    window.location.reload();
    setRatingVal('');
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
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-b-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-md"
            >
              How many stars would you rate this event?
            </div>
            <div>
              <input
                onChange={(e) => setRatingVal(e.target.value)}
                type = "number"
                value = {ratingVal}
                max="5"
                required
                className="block p-2 w-36 text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></input>
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

export default RatingCreateView;