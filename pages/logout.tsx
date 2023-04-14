import Link from 'next/link';
import React from 'react';

const LogoutView = () => {
  return (
    <div className="py-10">
      <div
        className="mx-auto rounded-[2rem] w-max border-[0.25rem] border-neutral-700 px-12 
        py-2 font-bold transition bg-neutral-50 hover:text-gray-800 text-Lg flex flex-col
        text-center"
      >
        <div className="flex flex-col py-8 font-semibold text-3xl">
          You have been Logged Out!
        </div>
        <div className="py-[8px]">
          <Link
            href="/"
            className="mx-auto rounded-full w-max border-[0.175rem] border-neutral-700 
            px-4 py-2 font-bold transition hover:bg-neutral-400 hover:text-gray-800 text-Lg"
          >
            Home
          </Link>
        </div>
        <div className="py-2"></div>
      </div>
    </div>
  );
};

export default LogoutView;