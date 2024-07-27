import { getMySession } from '@/helpers/getMySession';
import { cache } from 'react';
import { userService } from '../userService';
import prisma from '@/database/db';

export const getProgress = cache(async () => {
  const session = await getMySession();
  const userProgress = await userService.getProgress();

  if (!session?.user.id || !userProgress?.activeCourse) {
    return null;
  }

  const unitsInActiveCouser = await prisma.unit.findMany({
    where: {
      courseId: userProgress.active_course_id,
    },
    orderBy: {
      order: 'asc',
    },
    include: {
      lessons: {
        orderBy: {
          order: 'asc',
        },
        include: {
          challenges: {
            include: {
              challengeProgress: {
                where: {
                  userId: session?.user.id,
                },
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCouser
    .flatMap(unit => unit.lessons)
    .find(lesson =>
      lesson.challenges.some(
        challenge =>
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            progress => progress.completed === false,
          ),
      ),
    );

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});
