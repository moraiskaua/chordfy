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
  const [selectedOption, setSelectedOption] = useState<string>();
  const [status, setStatus] = useState<'CORRECT' | 'WRONG' | 'NONE'>('NONE');
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      challenge => !challenge.completed,
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge.challengeOptions ?? [];

  const onSelect = (id: string) => {
    if (status !== 'NONE') return;

    setSelectedOption(id);
  };

  const title =
    currentChallenge.type === 'ASSIST'
      ? 'Select the correct answer'
      : currentChallenge.question;

  return {
    hearts,
    percentage,
    selectedOption,
    currentChallenge,
    title,
    options,
    status,
    onSelect,
  };
};
