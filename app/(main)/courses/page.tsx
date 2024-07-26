import { coursesService } from '@/services/courses';
import { List } from './components/List';
import { userService } from '@/services/userService';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

interface CoursesPageProps {}

const CoursesPage: React.FC<CoursesPageProps> = async ({}) => {
  const courses = await coursesService.getAll();
  const userProgress = await userService.getUserProgress();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Module Courses</h1>

      <List courses={courses} activeCourseId={userProgress?.active_course_id} />
    </div>
  );
};

export default CoursesPage;
