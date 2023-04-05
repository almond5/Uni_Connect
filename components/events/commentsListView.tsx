import React from 'react';

const CommentsListView = (props: { feedback: any }) => {
  const comments = props.feedback?.comments;

  if (comments === null || comments === undefined || comments.length === 0) {
    return <div>No comments yet!</div>;
  }

  return (
    <div>
      {comments.map((comment: any) => (
        <div>
          <div className="text-left font-bold ">{comment.author}</div>
          <div className="text-left font-md">{comment.comment}</div>
          <hr className='h-px my-2 border-0 bg-stone-600'></hr>
        </div>
      ))}
    </div>
  );
};

export default CommentsListView;
