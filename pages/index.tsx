import { useSession } from 'next-auth/react';

const Index = () => {
  const { status: session } = useSession();
  return <div>HIIII</div>
};

export default Index;