import { MobileHeader } from '@/components/MobileHeader';
import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="bg-red-300 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
