import prisma from '@/src/database/db';
import { getMySession } from '@/src/helpers/getMySession';
import { cache } from 'react';

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
