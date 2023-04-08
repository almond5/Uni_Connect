import React, { useState } from 'react';
import RatingListView from './ratingsListView';
import RatingCreateView from './ratingCreateView';

const RatingModalView = (props: {
    setRatingModalView: any;
    event: any;
    role: any;
}) => {
    const [newRating, setNewRating] = useState(false);
    const event = props.event
    const role = props.role

    const handleClose = () =>{
        props.setRatingModalView(false);
    };

    const handleNewRating = () => {
        setNewRating(!newRating);
    };

    return(
        <div
      className="h-[22rem] outline bg-stone-50
        p-7 rounded-lg overflow-y-scroll"
    >
      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={handleClose}
            className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-0.5 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800"
          >
            Close
          </button>
        </div>
        <div>
          <button
            onClick={handleNewRating}
            className={`${
              !newRating
                ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] text-md border-neutral-700 px-3 py-0.5 font-bold transition bg-neutral-50 text-md hover:bg-neutral-400 hover:text-gray-800'
                : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] text-md border-neutral-700 px-3 py-0.5 font-bold transition bg-neutral-400 text-gray-800'
            }`}
          >
            Add Rating
          </button>
        </div>
      </div>
      <div className={`${newRating ? '' : 'hidden'}`}>
        <RatingCreateView event={event}></RatingCreateView>
      </div>
      <div
        className="py-[.5rem] flex-col text-center mx-auto max-w-sm xs:max-w-sm 
      sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid md:grid-cols-1 
      lg:grid-cols-1"
      >
        <div className={`${!newRating ? '' : 'hidden'}`}>
          <RatingListView feedback={event.feedback} role={role}></RatingListView>
        </div>
      </div>
    </div>
  );
};

export default RatingModalView;