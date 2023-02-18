import LoginView from '../components/loginView';
import { useSession } from 'next-auth/react';

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
      </div>
    </div>
  );
};

export default LandingPage;
