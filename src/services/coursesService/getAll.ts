import { cache } from 'react';
import prisma from '@/src/database/db';

export const getAll = cache(async () => {
  return await prisma.course.findMany();
});
