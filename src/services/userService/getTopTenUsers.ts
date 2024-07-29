import prisma from '@/src/database/db';
import { getMySession } from '@/src/helpers/getMySession';
import { cache } from 'react';

export const getTopTenUsers = cache(async () => {
  const session = await getMySession();

  if (!session?.user.id) return [];

  return await prisma.userProgress.findMany({
    orderBy: {
      points: 'desc',
    },
    take: 10,
    select: {
      userId: true,
      user_name: true,
      user_image: true,
      points: true,
    },
  });
});
