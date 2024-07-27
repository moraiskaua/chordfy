import { FeedWrapper } from '@/components/FeedWrapper';
import { StickyWrapper } from '@/components/StickyWrapper';
import { Header } from './components/Header';
import { UserProgress } from '@/components/UserProgress';
import { userService } from '@/services/userService';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';
import { unitsService } from '@/services/unitsService';
import { Unit } from './components/Unit';
import { lessonsService } from '@/services/LessonsService';
import { coursesService } from '@/services/coursesService';

interface LearnPageProps {}

const LearnPage: React.FC<LearnPageProps> = async ({}) => {
  const userProgress = await userService.getProgress();
  const units = await unitsService.getAll();
  const lessonPercentage = await lessonsService.getPercentage();
  const courseProgress = await coursesService.getProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect(routes.COURSES);
  }

  if (!courseProgress) {
    redirect(routes.COURSES);
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscriptions={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map(unit => (
          <Unit
            key={unit.id}
            id={unit.id}
            order={unit.order}
            title={unit.title}
            description={unit.description}
            lessons={unit.lessons}
            activeLesson={courseProgress.activeLesson}
            activeLessonPercentage={lessonPercentage}
          />
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
