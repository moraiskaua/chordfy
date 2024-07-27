import { routes } from '@/constants/routes';
import Link from 'next/link';
import { Button } from './ui/Button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';
import { Course } from '@prisma/client';

interface UserProgressProps {
  activeCourse: Course;
  hearts: number;
  points: number;
  hasActiveSubscriptions: boolean;
}

export const UserProgress: React.FC<UserProgressProps> = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscriptions,
}) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href={routes.COURSES}>
        <Button variant="default">
          <Image
            src={activeCourse.image}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md"
          />
        </Button>
      </Link>
      <Link href={routes.SHOP}>
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt="Points"
            width={28}
            height={28}
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href={routes.SHOP}>
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt="Points"
            width={22}
            height={22}
            className="mr-2"
          />
          {hasActiveSubscriptions ? (
            <InfinityIcon className="size-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
