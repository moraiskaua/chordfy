import { cache } from 'react';
import prisma from '@/database/db';

export const getAll = cache(async () => {
  const data = await prisma.course.findMany();

  return data;
});
