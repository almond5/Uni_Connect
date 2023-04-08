import React from 'react';
import EditDeleteCommentComponent from './editDeleteCommentComponent';

const CommentsListView = (props: { feedback: any; role: any }) => {
  const comments = props.feedback?.comments;

  if (comments === null || comments === undefined || comments.length === 0) {
    return <div>No comments yet!</div>;
  }

  return (
    <div>
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <EditDeleteCommentComponent
            comment={comment} role={props.role}
          ></EditDeleteCommentComponent>
        </div>
      ))}
    </div>
  );
};

export default CommentsListView;
