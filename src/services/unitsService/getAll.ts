import { cache } from 'react';
import { userService } from '../userService';
import prisma from '@/src/database/db';
import { getMySession } from '@/src/helpers/getMySession';

export const getAll = cache(async () => {
  const userProgress = await userService.getProgress();
  const session = await getMySession();

  if (!session?.user.id || !userProgress?.active_course_id) {
    return [];
  }

  const data = await prisma.unit.findMany({
    where: {
      courseId: userProgress.active_course_id,
    },
    orderBy: {
      order: 'asc',
    },
    include: {
      lessons: {
        include: {
          challenges: {
            include: {
              challengeProgress: {
                where: {
                  userId: session.user.id,
                },
              },
            },
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

  const normalizedData = data.map(unit => {
    const lessonsWithCompletedStatus = unit.lessons.map(lesson => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }

      const allCompletedChallenges = lesson.challenges.every(challenge => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every(progress => progress.completed)
        );
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});
