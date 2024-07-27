'use server';

import { coursesService } from '@/services/courses';
import { userService } from '@/services/userService';
import prisma from '@/database/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';
import { getMySession } from '@/helpers/getMySession';

export const updateUserProgress = async (courseId: string) => {
  const session = await getMySession();
  console.log(courseId);

  if (!session?.user || !session?.user.id) {
    throw new Error('Unauthorized!');
  }

  const course = await coursesService.getById(courseId);

  if (!course) {
    throw new Error('Course not found!');
  }

  // Continue when lessions is added.
  // if (!course.units.length || !course.units[0].length) {
  //   throw new Error('Course is empty!');
  // }

  const existingUserProgress = await userService.getUserProgress();

  if (existingUserProgress) {
    await prisma.userProgress.update({
      where: {
        userId: session.user.id,
      },
      data: {
        active_course_id: courseId,
        user_name: session.user.name || 'User',
        user_image: session.user.image || '',
      },
    });

    revalidatePath(routes.COURSES);
    revalidatePath(routes.LEARN);
    redirect(routes.LEARN);
  }

  await prisma.userProgress.create({
    data: {
      userId: session.user.id,
      active_course_id: courseId,
      user_name: session.user.name || 'User',
      user_image: session.user.image || '',
    },
  });

  revalidatePath(routes.COURSES);
  revalidatePath(routes.LEARN);
  redirect(routes.LEARN);
};
