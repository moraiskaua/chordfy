import { FeedWrapper } from '@/components/FeedWrapper';
import { StickyWrapper } from '@/components/StickyWrapper';
import { Header } from './components/Header';

interface LearnPageProps {}

const LearnPage: React.FC<LearnPageProps> = ({}) => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>My stick sidebar</StickyWrapper>
      <FeedWrapper>
        <Header title="Escales" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
