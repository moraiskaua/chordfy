import prisma from '@/database/db';
import { cache } from 'react';
import { getMySession } from '@/helpers/getMySession';

export const getProgress = cache(async () => {
  const session = await getMySession();

  return await prisma.userProgress.findFirst({
    where: {
      userId: session?.user.id,
    },
    include: {
      activeCourse: {
        include: {
          userProgress: true,
        },
      },
    },
  });
});
