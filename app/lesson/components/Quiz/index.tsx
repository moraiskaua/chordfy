'use client';

import { Challenge, ChallengeOption } from '@prisma/client';
import { Header } from '../Header';
import { useQuizController } from './useQuizController';

interface QuizProps {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: string;
  initialLessonChallenges: (Challenge & {
    completed: boolean;
    challengeOptions: ChallengeOption[];
  })[];
  userSubscription: any;
}

export const Quiz: React.FC<QuizProps> = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}) => {
  const { hearts, percentage } = useQuizController(
    initialHearts,
    initialPercentage,
  );

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={userSubscription}
      />
    </>
  );
};
