'use client';

import Image from 'next/image';
import { Challenge } from '../Challenge';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { QuestionBubble } from '../QuestionBubble';
import { LessonChallengeType, useQuizController } from './useQuizController';
import { ResultCard } from '../ResultCard';
import { routes } from '@/constants/routes';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

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
    pending,
    correctAudio,
    incorrectAudio,
    finishAudio,
    challenges,
    lessonId,
    router,
    onSelect,
    onContinue,
  } = useQuizController(
    initialHearts,
    initialPercentage,
    initialLessonChallenges,
    initialLessonId,
  );

  const { width, height } = useWindowSize();

  if (!currentChallenge)
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/icons/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/icons/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="COMPLETED"
          onCheck={() => router.push(routes.LEARN)}
        />
      </>
    );

  return (
    <>
      {correctAudio}
      {incorrectAudio}
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
                disabled={status !== 'NONE' || pending}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        onCheck={onContinue}
        status={status}
        disabled={pending || !selectedOption}
      />
    </>
  );
};
