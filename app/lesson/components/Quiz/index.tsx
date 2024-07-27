'use client';

import { Challenge } from '../Challenge';
import { Header } from '../Header';
import { QuestionBubble } from '../QuestionBubble';
import { LessonChallengeType, useQuizController } from './useQuizController';

interface QuizProps {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: string;
  initialLessonChallenges: LessonChallengeType[];
  userSubscription: any;
}

export const Quiz: React.FC<QuizProps> = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}) => {
  const {
    hearts,
    percentage,
    title,
    currentChallenge,
    options,
    status,
    selectedOption,
    onSelect,
  } = useQuizController(
    initialHearts,
    initialPercentage,
    initialLessonChallenges,
  );

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={userSubscription}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {currentChallenge.type === 'ASSIST' && (
                <QuestionBubble question={currentChallenge.question} />
              )}

              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
