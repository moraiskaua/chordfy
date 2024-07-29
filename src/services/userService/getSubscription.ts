import prisma from '@/src/database/db';
import { getMySession } from '@/src/helpers/getMySession';
import { cache } from 'react';

const DAY_IN_MS = 86_400_000;

export const getSubscription = cache(async () => {
  const session = await getMySession();

  if (!session?.user.id) return null;

  const data = await prisma.userSubscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!data) return null;

  const isActive =
    data.stripe_price_id &&
    data.stripe_current_period_end.getTime() + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});
