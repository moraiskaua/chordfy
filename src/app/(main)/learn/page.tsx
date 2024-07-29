import { FeedWrapper } from '@/src/components/FeedWrapper';
import { StickyWrapper } from '@/src/components/StickyWrapper';
import { Header } from './components/Header';
import { UserProgress } from '@/src/components/UserProgress';
import { userService } from '@/src/services/userService';
import { redirect } from 'next/navigation';
import { routes } from '@/src/constants/routes';
import { unitsService } from '@/src/services/unitsService';
import { Unit } from './components/Unit';
import { lessonsService } from '@/src/services/LessonsService';
import { coursesService } from '@/src/services/coursesService';
import { Promo } from '@/src/components/Promo';

interface LearnPageProps {}

const LearnPage: React.FC<LearnPageProps> = async ({}) => {
  const userProgress = await userService.getProgress();
  const units = await unitsService.getAll();
  const lessonPercentage = await lessonsService.getPercentage();
  const courseProgress = await coursesService.getProgress();
  const userSubscription = await userService.getSubscription();

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect(routes.COURSES);
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!!!userSubscription?.isActive && <Promo />}
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
