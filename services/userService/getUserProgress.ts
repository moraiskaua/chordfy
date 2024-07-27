import prisma from '@/database/db';
import { cache } from 'react';
import { getMySession } from '@/helpers/getMySession';

export const getUserProgress = cache(async () => {
  const session = await getMySession();

  return prisma.userProgress.findFirst({
    where: {
      userId: session?.user.id,
    },
    include: {
      ActiveCourse: true,
    },
  });
});
