import { refilHearts } from '@/src/actions/updateUserProgress';
import { createStripeUrl } from '@/src/actions/userSubscription';
import { POINTS_TO_REFIL } from '@/src/constants/hearts';
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

  const handleUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then(response => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error('Something went wrong.'));
    });
  };

  return { pending, POINTS_TO_REFIL, handleRefilHearts, handleUpgrade };
};
