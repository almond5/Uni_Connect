import React, { useState } from 'react';

// create a component that will display all the comments as a list of comments
const CommentsListView = (props: { comments: any }) => {
  // display the comments as a scrollable list
  return (
    <div className="flex flex-col h-96 overflow-y-scroll">
      {props.comments.map((comment: any) => (
        <div className="flex flex-row justify-between items-center p-2">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="font-bold">{comment.author}</div>
              <div className="text-gray-500 ml-2">{comment.date}</div>
            </div>
            <div className="text-gray-500">{comment.body}</div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center">
              <div className="text-gray-500 mr-2">{comment.likes}</div>
              <div className="text-gray-500">Likes</div>
            </div>
            <div className="flex flex-row items-center ml-4">
              <div className="text-gray-500 mr-2">{comment.dislikes}</div>
              <div className="text-gray-500">Dislikes</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsListView;