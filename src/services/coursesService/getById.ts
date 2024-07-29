import { cache } from 'react';
import prisma from '@/src/database/db';

export const getById = cache(async (courseId: string) => {
  return await prisma.course.findFirst({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          lessons: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
});
