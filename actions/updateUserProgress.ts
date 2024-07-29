'use server';

import { coursesService } from '@/services/coursesService';
import { userService } from '@/services/userService';
import prisma from '@/database/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';
import { getMySession } from '@/helpers/getMySession';

const POINTS_TO_REFIL = 20;

export const updateUserProgress = async (courseId: string) => {
  const session = await getMySession();

  if (!session?.user) throw new Error('Unauthorized!');

  const course = await coursesService.getById(courseId);

  if (!course) throw new Error('Course not found!');

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error('Course is empty!');
  }

  const existingUserProgress = await userService.getProgress();

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

export const reduceHearts = async (challengeId: string) => {
  const session = await getMySession();

  if (!session?.user) throw new Error('Unauthorized!');

  const currentUserProgress = await userService.getProgress();
  const userSubscription = await userService.getSubscription();

  const challenge = await prisma.challenge.findFirst({
    where: {
      id: challengeId,
    },
  });

  if (!challenge) throw new Error('Challenge not found!');

  const existingChallengProgress = await prisma.challengeProgress.findFirst({
    where: {
      AND: [
        {
          userId: session?.user.id,
        },
        {
          challengeId: challengeId,
        },
      ],
    },
  });

  const isPractice = !!existingChallengProgress;

  if (isPractice) return { error: 'practice' };

  if (!currentUserProgress) {
    throw new Error('User progress not found!');
  }

  if (userSubscription?.isActive) return { error: 'subscription' };

  if (currentUserProgress.hearts === 0) return { error: 'hearts' };

  await prisma.userProgress.update({
    where: {
      userId: session?.user.id,
    },
    data: {
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    },
  });

  revalidatePath(routes.SHOP);
  revalidatePath(routes.LEARN);
  revalidatePath(routes.QUESTS);
  revalidatePath(routes.LEADERBOARD);
  revalidatePath(`${routes.LESSON}/${challenge.lessonId}`);
};

export const refilHearts = async () => {
  const currentUserProgress = await userService.getProgress();

  if (!currentUserProgress) throw new Error('User progress not found!');

  if (currentUserProgress.hearts === 5)
    throw new Error('Hearts are already full!');

  if (currentUserProgress.points < POINTS_TO_REFIL)
    throw new Error('Not enough points!');

  await prisma.userProgress.update({
    where: {
      userId: currentUserProgress.userId,
    },
    data: {
      hearts: Math.min(currentUserProgress.hearts + 1, 5),
      points: currentUserProgress.points - POINTS_TO_REFIL,
    },
  });

  revalidatePath(routes.SHOP);
  revalidatePath(routes.LEARN);
  revalidatePath(routes.QUESTS);
  revalidatePath(routes.LEADERBOARD);
};
