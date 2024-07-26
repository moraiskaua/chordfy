import { Footer } from '@/app/(marketing)/components/Footer';
import { Header } from '@/app/(marketing)/components/Header';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

interface MarketingLayoutProps {
  children: ReactNode;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = async ({
  children,
}) => {
  const session = await getServerSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={session?.user} />
      <main className="flex-1 flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
