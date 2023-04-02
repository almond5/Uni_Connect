import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const editModal = (props: {
  toggleEditModalView: any;
  event: any;
}) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState(props.event.title);
  const [body, setBody] = useState(props.event.body);
  const id = props.event.id;

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const updateNote = async (note: {
    id: string;
    title: string;
    body: string;
    user:
      | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
        }
      | undefined;
  }) => {
    const response = await fetch('/api/noteUpdate', {
      method: 'POST',
      body: JSON.stringify(note),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = session?.user;
    const note = { id, title, body, user };
    await updateNote(note);
    await timeout(1000);
    window.location.reload();
    setBody('');
    setTitle('');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col bg-gray-600 
      bg-opacity-50 z-50 text-center py-48"
    >
      <form onSubmit={handleSubmit}>
        <div
          className="outline bg-stone-50 p-4 rounded-lg mx-auto max-w-md text-xl text-left xs:max-w-lg sm:max-w-lg
          md:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg"
        >
          <div className="mb-4 text-lg font-bold">
            <div className="flex justify-end">
              <div
                className="flex rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 font-bold transition 
                bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
              >
                <button onClick={props.toggleEditModalView}>
                  <AiOutlineClose style={{ fontSize: '30px' }} />
                </button>
              </div>
            </div>
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Title:
            </div>
            <textarea
              maxLength={30}
              onChange={(e) => setTitle(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2.5 w-full text-sm text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700"
            >
              {props.event.title}
            </textarea>{' '}
          </div>
          <div className="mb-4 text-lg font-bold">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
              border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Note:
            </div>
            <div>
              <textarea
                maxLength={240}
                onChange={(e) => [setBody(e.target.value)]}
                required
                rows={7}
                cols={1}
                className="block p-2.5 w-full text-sm text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] rounded-tl-none
                border-neutral-700"
              >
                {props.event.note}
              </textarea>{' '}
            </div>
          </div>
          <div className="flex justify-center py-[14px]">
            <button>
              <div
                className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 
                py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
              >
                Submit
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default editModal;