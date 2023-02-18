import LoginView from '../components/loginView';
import { useSession } from 'next-auth/react';
import LandingPage from './landingPage';

const Index = () => {
  const { status: session } = useSession();
  if (session === 'loading') {
    return null;
  }

  if (session === 'unauthenticated') {
    return <LoginView />;
  }

  return <LandingPage />;
};

export default Index;
