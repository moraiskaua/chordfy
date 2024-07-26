import { getServerSession } from 'next-auth';
import prisma from '@/database/db';
import { cache } from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getUserProgress = cache(async () => {
  const session = await getServerSession(authOptions);

  return prisma.userProgress.findFirst({
    where: {
      userId: session?.user.id,
    },
    include: {
      ActiveCourse: true,
    },
  });
});
