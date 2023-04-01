import React, { useState } from 'react';
import ApprovalEventView from './approvalEventView';

const ApprovalsListView = (props: { approvals: any }) => {
  const approvals = props.approvals;

  if (approvals === null || approvals === undefined || approvals.length === 0)
    return (
      <div className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800">
        There are no pending approvals!
      </div>
    );
  else {
    return (
      <div
        className="py-[4.4rem] flex-col text-center mx-auto max-w-sm xs:max-w-sm 
      sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg grid md:grid-cols-1 
      lg:grid-cols-1"
      >
        {' '}
        {approvals.map((approval: any) => (
          <div key={approval.id}>
            <ApprovalEventView approval={approval}></ApprovalEventView>
          </div>
        ))}
      </div>
    );
  }
};

export default ApprovalsListView;
