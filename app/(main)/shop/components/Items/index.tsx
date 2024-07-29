'use client';

import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useItemsController } from './useItemsController';

interface ItemsProps {
  hearts: number;
  points: number;
  hasActiveSubscriptions: boolean;
}

export const Items: React.FC<ItemsProps> = ({
  hearts,
  points,
  hasActiveSubscriptions,
}) => {
  const { pending, POINTS_TO_REFIL, handleRefilHearts } = useItemsController(
    hearts,
    points,
  );

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/icons/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refil hearts
          </p>
        </div>
        <Button
          disabled={pending || hearts === 5 || points < POINTS_TO_REFIL}
          onClick={handleRefilHearts}
        >
          {hearts === 5 ? (
            'Full'
          ) : (
            <div className="flex items-center">
              <Image
                src="/icons/points.svg"
                alt="Points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFIL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};
