import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import RSOView from './rsoView';
import Login from './loginView';

const RSOSListView = (props: { rsos: any }) => {
    const { status: sesh } = useSession();
    const rsos = props.rsos;

    if (sesh === 'loading') {
        return null;
    }
    
    if (sesh === 'unauthenticated') {
        return <Login />;
    }
    
    if (rsos === null || rsos === undefined || rsos.length === 0) {
      return (
        <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
          There are no events!
        </div>
      );
    }
    else {
      return (
        <>
          {rsos.map((rso: any) => (
            <RSOView rso={rso}></RSOView>
          ))}
        </>
      );
    }
};

export default RSOSListView;