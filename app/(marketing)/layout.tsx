import { Footer } from '@/app/(marketing)/components/Footer';
import { Header } from '@/app/(marketing)/components/Header';
import { ReactNode } from 'react';

interface MarketingLayoutProps {
  children: ReactNode;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
