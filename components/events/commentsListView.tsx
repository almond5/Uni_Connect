import React from 'react';

const CommentsListView = (props: { feedback: any }) => {
  const comments = props.feedback.comments;

  if (comments === null || comments === undefined || comments.length === 0) {
    return <div>No comments yet!</div>;
  }

  return (
    <div className="flex flex-col h-96 overflow-y-scroll">
      {comments.map((comment: any) => (
        <div className="flex flex-row justify-between items-center p-2">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="font-bold">{comment.comment}</div>
            </div>
            <div className="text-gray-500">{comment.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsListView;
