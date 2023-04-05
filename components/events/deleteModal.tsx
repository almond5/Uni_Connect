import { useSession } from 'next-auth/react';
import { FcCheckmark } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import React from 'react';

const DeleteModalView = (props: {
  setDeleteModalView: any;
  event: any;
}) => {
  const { data: session } = useSession();
  const event = props.event;
  const title = event.title;

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleClose = () => {
    props.setDeleteModalView(false);
  };

  const handleDelete = async () => {
    const user = session?.user;
    await timeout(1000);
  };

  // const deleteNote = async (note: {
  //   title: string;
  //   body: string;
  //   date: string;
  //   user:
  //     | {
  //         name?: string | null | undefined;
  //         email?: string | null | undefined;
  //         image?: string | null | undefined;
  //       }
  //     | undefined;
  // }) => {
  //   const response = await fetch('/api/noteDelete', {
  //     method: 'POST',
  //     body: JSON.stringify(note),
  //   });

  //   const data = await response.json();
  //   console.log(data);
  // };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600 
      bg-opacity-50 z-50 "
    >
      <div
        className="h-[12rem] outline bg-stone-50
        p-8 rounded-lg"
      >
        <div className="text-center break-all text-xl font-bold">
          Delete this event?
          <div className="py-4 font-bold break-all">{event.title}</div>
        </div>
        <div className='flex justify-evenly'>
          <button
            onClick={() => handleClose()}
            className="px-2 rounded-full py-0.5 font-bold transition hover:bg-gray-300 
        hover:text-gray-800 text-Lg"
          >
            <FcCancel style={{ fontSize: '40px' }} />
          </button>
          <button
            onClick={() => handleDelete()}
            className="px-2 rounded-full py-0.5 font-bold transition hover:bg-gray-300 
          hover:text-gray-800 text-Lg"
          >
            <FcCheckmark style={{ fontSize: '40px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalView;