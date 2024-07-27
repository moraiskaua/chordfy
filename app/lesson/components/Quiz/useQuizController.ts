import { updateChallengeProgress } from '@/actions/updateChallengeProgress';
import { reduceHearts } from '@/actions/updateUserProgress';
import { Challenge, ChallengeOption, ChallengeType } from '@prisma/client';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

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
  const [pending, startTransition] = useTransition();
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
  const onNext = () => setActiveIndex(current => current + 1);

  const onSelect = (id: string) => {
    if (status !== 'NONE') return;

    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === 'WRONG') {
      setStatus('NONE');
      setSelectedOption(undefined);
      return;
    }

    if (status === 'CORRECT') {
      onNext();
      setStatus('NONE');
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find(option => option.correct);

    if (!correctOption) return;

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        updateChallengeProgress(currentChallenge.id)
          .then(response => {
            if (response?.error === 'hearts') {
              return console.log('Missing hearts!');
            }

            setStatus('CORRECT');
            setPercentage(prev => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts(prev => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error('Something went wrong.'));
      });
    } else {
      startTransition(() => {
        reduceHearts(currentChallenge.id)
          .then(response => {
            if (response?.error === 'hearts') {
              return console.log('Missing hearts!');
            }

            setStatus('WRONG');

            if (!response?.error) {
              setHearts(prev => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error('Something went wrong.'));
      });
    }
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
    pending,
    onSelect,
    onContinue,
  };
};
