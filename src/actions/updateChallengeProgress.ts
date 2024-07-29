'use server';

import { routes } from '@/src/constants/routes';
import prisma from '@/src/database/db';
import { getMySession } from '@/src/helpers/getMySession';
import { userService } from '@/src/services/userService';
import { revalidatePath } from 'next/cache';

export const updateChallengeProgress = async (challengeId: string) => {
  const session = await getMySession();

  if (!session?.user) {
    throw new Error('Unauthorized!');
  }

  const currentUserProgress = await userService.getProgress();
  const userSubscription = await userService.getSubscription();

  if (!currentUserProgress) {
    throw new Error('User progress not found!');
  }

  const challenge = await prisma.challenge.findFirst({
    where: {
      id: challengeId,
    },
  });

  if (!challenge) {
    throw new Error('Challenge not found!');
  }

  const existingChallengeProgress = await prisma.challengeProgress.findFirst({
    where: {
      AND: [{ userId: session.user.id }, { challengeId: challenge.id }],
    },
  });

  const isPractice = !!existingChallengeProgress;

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
  ) {
    return { error: 'hearts' };
  }

  if (isPractice) {
    await prisma.challengeProgress.update({
      where: {
        id: existingChallengeProgress.id,
      },
      data: {
        completed: true,
      },
    });

    await prisma.userProgress.update({
      where: {
        userId: session.user.id,
      },
      data: {
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      },
    });

    revalidatePath(routes.LEARN);
    revalidatePath(routes.LESSON);
    revalidatePath(routes.QUESTS);
    revalidatePath(routes.LEADERBOARD);
    revalidatePath(`${routes.LESSON}/${challenge.lessonId}`);
    return;
  }

  await prisma.challengeProgress.create({
    data: {
      userId: session.user.id,
      challengeId,
      completed: true,
    },
  });

  await prisma.userProgress.update({
    where: {
      userId: session.user.id,
    },
    data: {
      points: currentUserProgress.points + 10,
    },
  });

  revalidatePath(routes.LEARN);
  revalidatePath(routes.LESSON);
  revalidatePath(routes.QUESTS);
  revalidatePath(routes.LEADERBOARD);
  revalidatePath(`${routes.LESSON}/${challenge.lessonId}`);
};
