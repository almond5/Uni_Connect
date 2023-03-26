import LoginView from '../components/loginView';
import { signOut, useSession } from 'next-auth/react';

const LandingPage = () => {
  const { status: sesh } = useSession();
  if (sesh === 'loading') {
    return null;
  }

  if (sesh === 'unauthenticated') {
    return <LoginView />;
  }

  return (
    <div className="py-10">
      <div className="flex justify-center">
        <div className="text-shadow px-4 font-bold text-2xl">Welcome</div>
        <div className="absolute top-0 right-10 py-9">
        <button
          className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 font-bold transition bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
          onClick={() =>
            signOut()
          }
        >
          Sign-Out
        </button>
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
