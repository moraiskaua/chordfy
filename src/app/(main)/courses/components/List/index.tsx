'use client';

import { Course } from '@prisma/client';
import { Card } from '../Card';
import { useListController } from './useListController';

interface ListProps {
  courses: Course[];
  activeCourseId?: string;
}

export const List: React.FC<ListProps> = ({ courses, activeCourseId }) => {
  const { pending, handleClick } = useListController(activeCourseId);

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map(course => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          image={course.image}
          onClick={handleClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
