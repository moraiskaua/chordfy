import { ChallengeType, Lesson } from '@prisma/client';
import { UnitBanner } from './UnitBanner';
import { LessonButton } from './LessonButton';

interface UnitProps {
  id: string;
  order: number;
  title: string;
  description: string;
  lessons: any[];
  activeLesson: Lesson | undefined;
  activeLessonPercentage: number;
}

export const Unit: React.FC<UnitProps> = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed === !isCurrent;

          return (
            <LessonButton
              id={lesson.id}
              key={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              locked={isLocked}
              current={isCurrent}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
