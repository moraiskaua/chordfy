import { cache } from 'react';
import prisma from '@/database/db';

export const getById = cache(async (courseId: string) => {
  return await prisma.course.findFirst({
    where: {
      id: courseId,
    },

    // include lessions later.
  });
});
