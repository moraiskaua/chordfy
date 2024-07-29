import Image from 'next/image';
import { Button } from './ui/Button';
import Link from 'next/link';
import { routes } from '../constants/routes';
import { quests } from '../constants';
import { Progress } from '@/src/components/ui/Progress';

interface QuestsProps {
  points: number;
}

export const Quests: React.FC<QuestsProps> = ({ points }) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href={routes.QUESTS}>
          <Button variant="superOutline" size="sm">
            View all
          </Button>
        </Link>
      </div>

      <ul className="w-full space-y-4">
        {quests.map(quest => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              key={quest.title}
              className="flex items-center w-full p-4 gap-x-3 border-t-2"
            >
              <Image
                src="/icons/points.svg"
                alt="Points"
                width={60}
                height={60}
              />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-xl font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-3" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
