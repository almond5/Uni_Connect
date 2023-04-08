import React from 'react';

const RatingsListView = (props: { feedback: any; role: any }) => {
  const ratings = props.feedback?.ratings;

  if (ratings === null || ratings === undefined || ratings.length === 0) {
    return <div>No ratings yet!</div>;
  }

  return (
    <div>
      {ratings.map((rating: any) => (
        <div key={rating.id}>
        rating
        </div>
      ))}
    </div>
  );
};

export default RatingsListView;