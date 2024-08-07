import { FeedWrapper } from '@/src/components/FeedWrapper';
import { StickyWrapper } from '@/src/components/StickyWrapper';
import { UserProgress } from '@/src/components/UserProgress';
import { routes } from '@/src/constants/routes';
import { userService } from '@/src/services/userService';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Items } from './components/Items';
import { Quests } from '@/src/components/Quests';
import { Promo } from '@/src/components/Promo';

interface ShopPageProps {}

const ShopPage: React.FC<ShopPageProps> = async ({}) => {
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
        {!!!userSubscription?.isActive && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/icons/shop.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
