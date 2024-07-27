import { FeedWrapper } from '@/components/FeedWrapper';
import { StickyWrapper } from '@/components/StickyWrapper';
import { Header } from './components/Header';
import { UserProgress } from '@/components/UserProgress';
import { userService } from '@/services/userService';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';

interface LearnPageProps {}

const LearnPage: React.FC<LearnPageProps> = async ({}) => {
  const userProgress = await userService.getUserProgress();

  if (!userProgress || !userProgress.ActiveCourse) {
    redirect(routes.COURSES);
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.ActiveCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscriptions={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.ActiveCourse.title} />
        <div className="space-y-4">
          <div />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
