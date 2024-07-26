'use client';

import { Course } from '@prisma/client';
import { Card } from './Card';

interface ListProps {
  courses: Course[];
  activeCourseId?: string;
}

export const List: React.FC<ListProps> = ({ courses, activeCourseId }) => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map(course => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          image={course.image}
          onClick={() => {}}
          disabled={false}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
