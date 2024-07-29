import { updateChallengeProgress } from '@/src/actions/updateChallengeProgress';
import { reduceHearts } from '@/src/actions/updateUserProgress';
import { useHeartsModal } from '@/src/stores/useHeartsModal';
import { usePracticeModal } from '@/src/stores/usePracticeModal';
import { Challenge, ChallengeOption, ChallengeType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useAudio, useMount } from 'react-use';
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
  initialLessonId: string,
) => {
  const [status, setStatus] = useState<'CORRECT' | 'WRONG' | 'NONE'>('NONE');
  const [selectedOption, setSelectedOption] = useState<string>();
  const [challenges] = useState(initialLessonChallenges);
  const [hearts, setHearts] = useState(initialHearts);
  const [pending, startTransition] = useTransition();
  const [lessonId] = useState(initialLessonId);
  const router = useRouter();
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage,
  );
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      challenge => !challenge.completed,
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [correctAudio, _c, correctAudioControls] = useAudio({
    src: '/effects/correct.mp3',
  });
  const [incorrectAudio, _i, incorrectAudioControls] = useAudio({
    src: '/effects/incorrect.mp3',
  });
  const [finishAudio] = useAudio({
    src: '/effects/finish.mp3',
    autoPlay: true,
  });

  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.challengeOptions ?? [];
  const onNext = () => setActiveIndex(current => current + 1);

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

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
              return openHeartsModal();
            }

            correctAudioControls.play();
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
              return openHeartsModal();
            }

            incorrectAudioControls.play();
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
    currentChallenge?.type === 'ASSIST'
      ? 'Select the correct answer'
      : currentChallenge?.question;

  return {
    hearts,
    percentage,
    selectedOption,
    currentChallenge,
    title,
    options,
    status,
    pending,
    correctAudio,
    incorrectAudio,
    finishAudio,
    challenges,
    lessonId,
    router,
    onSelect,
    onContinue,
  };
};
