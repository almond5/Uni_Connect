import { useSession } from 'next-auth/react';
import React from 'react';
import RSORequestView from './rsoRequestView';
import router from 'next/router';

const RSORequestsView = (props: { members: any }) => {
  const { status: sesh } = useSession();
  const members = props.members;

  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    router.push('/login');
  }

  if (members === null || members === undefined || members.length === 0) {
    return (
      <div className="py-10">
        <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
          There are no new member requests!
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="py-[4.4rem] flex-col text-center mx-auto max-w-sm xs:max-w-sm 
      sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid md:grid-cols-1 
      lg:grid-cols-1"
      >
        {' '}
        {members.map((member: any) => (
          <div key={member.id}>
            <RSORequestView member={member}></RSORequestView>
          </div>
        ))}
      </div>
    );
  }
};

export default RSORequestsView;
