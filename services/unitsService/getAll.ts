import { cache } from 'react';
import { userService } from '../userService';
import prisma from '@/database/db';
import { getMySession } from '@/helpers/getMySession';

export const getAll = cache(async () => {
  const userProgress = await userService.getUserProgress();
  const session = await getMySession();

  if (!session?.user.id || !userProgress?.active_course_id) {
    return [];
  }

  const data = await prisma.unit.findMany({
    where: {
      courseId: userProgress.active_course_id,
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
          },
        },
      },
    },
  });

  return data;

  // const normalizedData = data.map(unit => {
  //   const lessonWithCompletedStatus = unit.lessons.map(lesson => {
  //     const allCompletedChallenges = lesson.challenges.every(challenge => {
  //       return (
  //         challenge.challengeProgress &&
  //         challenge.challengeProgress.length > 0 &&
  //         challenge.challengeProgress.every(progress => progress.completed)
  //       );
  //     });

  //     return {
  //       lesson,
  //       completed: allCompletedChallenges,
  //     };
  //   });

  //   return {
  //     ...unit,
  //     lessons: lessonWithCompletedStatus,
  //   };
  // });

  // return normalizedData;
});
