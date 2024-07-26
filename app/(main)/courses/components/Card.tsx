import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface CardProps {
  id: string;
  title: string;
  image: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  image,
  disabled,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-[#C47BFD] flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] size-4" />
          </div>
        )}
      </div>

      <Image
        src={image}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg drop-shadow-md object-cover"
      />
      <p className="text-neutral-700 text-center font-bold">{title}</p>
    </div>
  );
};
