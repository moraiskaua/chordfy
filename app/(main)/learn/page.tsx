import { FeedWrapper } from '@/components/FeedWrapper';
import { StickyWrapper } from '@/components/StickyWrapper';
import { Header } from './components/Header';
import { UserProgress } from '@/components/UserProgress';

interface LearnPageProps {}

const LearnPage: React.FC<LearnPageProps> = ({}) => {
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
