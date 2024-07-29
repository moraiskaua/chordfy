import { lessonsService } from '@/src/services/LessonsService';
import { Quiz } from './components/Quiz';
import { userService } from '@/src/services/userService';
import { redirect } from 'next/navigation';
import { routes } from '@/src/constants/routes';

interface LessonPageProps {}

const LessonPage: React.FC<LessonPageProps> = async () => {
  const lesson = await lessonsService.getById();
  const userProgress = await userService.getProgress();
  const userSubscription = await userService.getSubscription();

  if (!lesson || !userProgress) {
    redirect(routes.LEARN);
  }

  const initialPercentage =
    (lesson.challenges.filter(challenge => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialPercentage={initialPercentage}
      initialHearts={userProgress.hearts}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
