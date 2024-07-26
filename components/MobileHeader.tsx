import { MobileSidebar } from '@/components/MobileSidebar';

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-[#C47BFD] border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};
