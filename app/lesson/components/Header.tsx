import { Progress } from '@/components/ui/Progress';
import { useExitModal } from '@/stores/useExitModal';
import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hearts,
  percentage,
  hasActiveSubscription,
}) => {
  const { open } = useExitModal();

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-50 transition cursor-pointer"
      />
      <Progress value={percentage} />

      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Hearts"
          className="mr-2"
        />
        {hasActiveSubscription ? <InfinityIcon /> : hearts}
      </div>
    </header>
  );
};
