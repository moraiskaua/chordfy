import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-2">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
          <h1 className="text-2xl font-extrabold tracking-wide text-[#bc7ef1]">
            Chordfy
          </h1>
        </div>

        <Button size="lg" variant="ghost">
          Login
        </Button>
      </div>
    </header>
  );
};
