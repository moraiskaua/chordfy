import { coursesService } from '@/services/coursesService';
import { List } from './components/List';

interface CoursesPageProps {}

const CoursesPage: React.FC<CoursesPageProps> = async ({}) => {
  const courses = await coursesService.getAll();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Module Courses</h1>

      <List
        courses={courses}
        activeCourseId={'91f406d0-531d-4547-a306-afb978570c64'}
      />
    </div>
  );
};

export default CoursesPage;