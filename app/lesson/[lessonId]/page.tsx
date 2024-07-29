import { lessonsService } from '@/services/LessonsService';
import { Quiz } from '../components/Quiz';
import { userService } from '@/services/userService';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';

interface LessonIdPageProps {
  params: {
    lessonId: string;
  };
}

const LessonIdPage: React.FC<LessonIdPageProps> = async ({ params }) => {
  const lesson = await lessonsService.getById(params.lessonId);
  const userProgress = await userService.getProgress();

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
      userSubscription={null}
    />
  );
};

export default LessonIdPage;
