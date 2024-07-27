import { getMySession } from '@/helpers/getMySession';
import { cache } from 'react';
import { coursesService } from '../coursesService';
import prisma from '@/database/db';

export const getById = cache(async (id: string) => {
  const session = await getMySession();

  if (!session?.user.id) return null;

  const courseProgress = await coursesService.getProgress();
  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) return null;

  const data = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
    },
    include: {
      challenges: {
        orderBy: {
          order: 'asc',
        },
        include: {
          challengeOptions: true,
          challengeProgress: {
            where: {
              userId: session?.user.id,
            },
          },
        },
      },
    },
  });

  if (!data || data?.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map(challenge => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every(progress => progress.completed);

    return {
      ...challenge,
      completed,
    };
  });

  return { ...data, challenges: normalizedChallenges };
});
