import { getIsAdmin } from '@/src/helpers/isAdmin';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const App = dynamic(() => import('./app'), { ssr: false });

const Admin: React.FC = async ({}) => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect('/');

  return <App />;
};

export default Admin;
