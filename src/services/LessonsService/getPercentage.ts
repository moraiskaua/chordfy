import { cache } from 'react';
import { coursesService } from '../coursesService';
import { lessonsService } from '.';

export const getPercentage = cache(async () => {
  const courseProgress = await coursesService.getProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await lessonsService.getById(courseProgress.activeLessonId);

  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(
    challenge => challenge.completed,
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );

  return percentage;
});
