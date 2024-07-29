import { FeedWrapper } from '@/src/components/FeedWrapper';
import { StickyWrapper } from '@/src/components/StickyWrapper';
import { UserProgress } from '@/src/components/UserProgress';
import { routes } from '@/src/constants/routes';
import { userService } from '@/src/services/userService';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/src/components/ui/Progress';

const quests = [
  {
    title: 'Earn 20 XP',
    value: 20,
  },
  {
    title: 'Earn 50 XP',
    value: 50,
  },
  {
    title: 'Earn 70 XP',
    value: 70,
  },
];

const QuestsPage: React.FC = async ({}) => {
  const userProgress = await userService.getProgress();
  const userSubscription = await userService.getSubscription();

  if (!userProgress) redirect(routes.COURSES);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/icons/quests.svg" alt="Quests" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
        </div>
        <ul className="w-full">
          {quests.map(quest => {
            const progress = (userProgress.points / quest.value) * 100;

            return (
              <div
                key={quest.title}
                className="flex items-center w-full p-4 gap-x-4 border-t-2"
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
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
