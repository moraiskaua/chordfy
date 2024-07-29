import { refilHearts } from '@/actions/updateUserProgress';
import { POINTS_TO_REFIL } from '@/constants/hearts';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const useItemsController = (hearts: number, points: number) => {
  const [pending, startTransition] = useTransition();

  const handleRefilHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFIL) return;

    startTransition(() => {
      refilHearts().catch(() => toast.error('Something went wrong.'));
    });
  };

  return { pending, POINTS_TO_REFIL, handleRefilHearts };
};