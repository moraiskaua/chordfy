import { cache } from 'react';
import prisma from '@/database/db';

export const getAll = cache(async () => {
  return await prisma.course.findMany();
});
