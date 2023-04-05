import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const EditDeleteCommentComponent = (props: { comment: any; role: any }) => {
  const [editCommentView, setEditCommentView] = useState(false);
  const [body, setBody] = useState('');
  const { data: sesh } = useSession();
  const comment = props.comment;

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const submitDeleteComment = async (comment: {
    commentId: string | undefined | null;
  }) => {
    const response = await fetch('/api/commentDelete', {
      method: 'POST',
      body: JSON.stringify(comment),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleDeleteComment = async (e: { preventDefault: () => void }) => {
    const commentToDelete = {
      commentId: comment.id,
    };
    await submitDeleteComment(commentToDelete);
    await timeout(1000);
    window.location.reload();
  };

  const toggleEditCommentView = () => {
    editCommentView ? setEditCommentView(false) : setEditCommentView(true);
  };

  if (comment.email !== sesh?.user?.email && props.role !== 'SUPERADMIN') {
    return (
      <div>
        <div className="text-left font-bold ">{comment.author}</div>
        <div className="text-left font-md">{comment.comment}</div>
        <hr className="h-px my-2 border-0 bg-stone-600"></hr>
      </div>
    );
  }

  const submitUpdateComment = async (commentUpdate: {
    commentId: string | undefined | null;
    body: string | undefined | null;
  }) => {
    const response = await fetch('/api/commentEdit', {
      method: 'POST',
      body: JSON.stringify(commentUpdate),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const commentUpdate = {
      commentId: comment.id,
      body,
    };
    await submitUpdateComment(commentUpdate);
    await timeout(1000);
    window.location.reload();
    setBody('');
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-left font-bold ">{comment.author}</div>
        <div className="flex justify-end">
          <button onClick={toggleEditCommentView}>Edit</button>
          <button className="ml-2" onClick={handleDeleteComment}>
            Delete
          </button>
        </div>
      </div>

      <div className={`${!editCommentView ? 'text-left font-md' : 'hidden'}`}>
        {comment.comment}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`${editCommentView ? '' : 'hidden'}`}>
          <textarea
            maxLength={322}
            defaultValue={comment.comment}
            onChange={(e) => [setBody(e.target.value)]}
            required
            cols={1}
            className="block px-2 py-1 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                 border-neutral-700"
          ></textarea>{' '}
          <div className="mt-1 py-[12px]">
            <button>
              <div
                className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] 
              border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-md hover:bg-neutral-400 
             hover:text-gray-800"
              >
                Submit
              </div>
            </button>
          </div>
        </div>
        <hr className="h-px my-2 border-0 bg-stone-600"></hr>
      </form>
    </div>
  );
};

export default EditDeleteCommentComponent;
