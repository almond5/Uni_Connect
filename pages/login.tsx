import SignUpView from '@/components/signup/signUpView';
import prisma from '@/lib/prismadb';
import { University } from '@prisma/client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export async function getServerSideProps() {
  try {
    const universities = await prisma.university.findMany({
      where: {},
    });

    return {
      props: {
        universitiesFromDB: universities,
      },
    };

  } catch (error) {
    const universities = null;
    return {
      props: {
        universitiesFromDB: universities,
      },
    };
  }
}

const LoginView = ({ universitiesFromDB }: { universitiesFromDB: any }) => {
  const [universities] = useState<University[]>(universitiesFromDB);
  const [signUpView, setSignUpView] = useState(false);

  const toggleSignUpView = () => {
    signUpView ? setSignUpView(false) : setSignUpView(true);
  };

  return (
    <div>
      <div className={`${signUpView ? 'hidden' : 'py-10'}`}>
        <div
          className="mx-auto rounded-[1rem] w-max border-[0.25rem] border-neutral-700 px-16 
        py-2 font-bold transition bg-neutral-50 hover:text-gray-800 text-Lg flex flex-col
        text-center"
        >
          <div className="flex flex-col py-8 font-semibold text-3xl">
            Term Project
          </div>
          <div className="py-[8px]">
            <Link
              href={'/api/auth/signin'}
              onClick={(e) => {
                e.preventDefault();
                signIn('Credentials', { callbackUrl: '/' });
              }}
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
            >
              Sign-in
            </Link>
          </div>
          <div className="py-[8px]">
            <button
              onClick={(e) => {
                toggleSignUpView();
              }}
              className={`${
                !signUpView
                  ? 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800'
                  : 'mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-400 text-gray-800'
              }`}
            >
              {' '}
              Sign-up
            </button>
          </div>
        </div>
      </div>
      <div className={signUpView ? '' : 'hidden'}>
        <div className="py-10">
          <div className="absolute top-0 left-10 py-10">
            <button
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-lg bg-neutral-50 text-gray-800"
              onClick={toggleSignUpView}
            >
              Back
            </button>
          </div>
        </div>
        <SignUpView unis={universities}></SignUpView>
      </div>
    </div>
  );
};

export default LoginView;
