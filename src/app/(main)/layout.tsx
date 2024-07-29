import { MobileHeader } from '@/src/components/MobileHeader';
import { Sidebar } from '@/src/components/Sidebar';
import { routes } from '@/src/constants/routes';
import { getMySession } from '@/src/helpers/getMySession';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = async ({ children }) => {
  const session = await getMySession();

  if (!session) {
    redirect(routes.AUTH);
  }

  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" user={session.user} />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
