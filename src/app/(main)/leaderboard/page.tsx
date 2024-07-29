import { FeedWrapper } from '@/src/components/FeedWrapper';
import { StickyWrapper } from '@/src/components/StickyWrapper';
import { UserProgress } from '@/src/components/UserProgress';
import { routes } from '@/src/constants/routes';
import { userService } from '@/src/services/userService';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Separator } from '@/src/components/ui/Separator';
import Avatar from '@/src/components/Avatar';

interface LeaderboardPageProps {}

const LeaderboardPage: React.FC<LeaderboardPageProps> = async ({}) => {
  const userProgress = await userService.getProgress();
  const userSubscription = await userService.getSubscription();
  const leaderboard = await userService.getTopTenUsers();

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
          <Image
            src="/icons/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
        </div>
        <Separator className="mb-4 h-0.5 rounded-full" />
        {leaderboard.map((userProgress, index) => {
          const user = {
            id: userProgress.userId,
            name: userProgress.user_name,
            email: userProgress.user_name,
            image: userProgress.user_image,
          };

          return (
            <div
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-[#C47BFD] mr-4">{index + 1}</p>
              <Avatar user={user} />
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.user_name}
              </p>
              <p className="text-muted-foreground">{userProgress.points} XP</p>
            </div>
          );
        })}
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
