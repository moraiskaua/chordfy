import { Challenge, ChallengeOption, ChallengeType } from '@prisma/client';
import { useState } from 'react';

export interface LessonChallengeType {
  id: string;
  lessonId: string;
  question: string;
  order: number;
  type: ChallengeType;
  completed: boolean;
  challengeOptions: ChallengeOption[];
}

export const useQuizController = (
  initialHearts: number,
  initialPercentage: number,
  initialLessonChallenges: LessonChallengeType[],
) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      challenge => !challenge.completed,
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge.challengeOptions ?? [];

  const title =
    currentChallenge.type === 'ASSIST'
      ? 'Select the correct answer'
      : currentChallenge.question;

  return { hearts, percentage, challenges, currentChallenge, title, options };
};
