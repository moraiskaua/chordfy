'use client';

import { routes } from '@/constants/routes';
import { useLessonButtonController } from './useLessonButtonController';
import { Check, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';

interface LessonButtonProps {
  id: string;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
}

export const LessonButton: React.FC<LessonButtonProps> = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}) => {
  const { rightPosition } = useLessonButtonController(index);

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;
  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `${routes.LESSON}/${id}` : routes.LESSON;

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? 'none' : 'auto' }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="size-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-[#C47BFD] bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 size-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>

            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: '#C47BFD',
                },
                trail: {
                  stroke: '#E5E7EB',
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? 'locked' : 'primary'}
                className="size-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    'size-10',
                    locked
                      ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                      : 'fill-primary-foreground text-primary-foreground',
                    isCompleted && 'fill-none stroke-[4]',
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={locked ? 'locked' : 'primary'}
            className="size-[70px] border-b-8"
          >
            <Icon
              className={cn(
                'size-10',
                locked
                  ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isCompleted && 'fill-none stroke-[4]',
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
