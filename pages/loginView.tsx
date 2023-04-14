import { signIn } from 'next-auth/react';
import Link from 'next/link';

const LoginView = () => {
  return (
    <div className="py-10">
      <div
        className="mx-auto rounded-[2rem] w-max border-[0.25rem] border-neutral-700 px-16 
        py-2 font-bold transition bg-neutral-50 hover:text-gray-800 text-Lg flex flex-col
        text-center"
      >
        <div className="flex flex-col py-8 font-semibold text-3xl">
          Term Project
        </div>
        <div className="py-[8px]">
          <Link
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="mx-auto rounded-full w-max border-[0.175rem] border-neutral-700 
            px-4 py-2 font-bold transition hover:bg-neutral-400 hover:text-gray-800 text-Lg"
          >
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
