import { updateUserProgress } from '@/actions/updateUserProgress';
import { routes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const useListController = (activeCourseId?: string) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (id: string) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push(routes.LEARN);
    }

    startTransition(() => {
      updateUserProgress(id).catch(() => toast.error('Something went wrong.'));
    });
  };
  return { pending, handleClick };
};
