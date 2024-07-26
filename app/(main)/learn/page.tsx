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
          activeCourse={{ title: 'Escales', icon: '/piano.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscriptions={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Escales" />
        <div className="space-y-4">
          <div />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
