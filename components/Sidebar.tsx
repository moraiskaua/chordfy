import { cn } from '@/lib/utils';
import { HeroAvatar } from './HeroAvatar';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { SidebarItem } from '@/components/SidebarItem';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col',
        className,
      )}
    >
      <Link href={routes.LEARN}>
        <HeroAvatar />
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href={routes.LEARN} icon="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href={routes.LEADERBOARD}
          icon="/leaderboard.svg"
        />
        <SidebarItem label="Quests" href={routes.QUESTS} icon="/quests.svg" />
        <SidebarItem label="Shop" href={routes.SHOP} icon="/shop.svg" />
      </div>
      <div className="p-4">Exit</div>
    </div>
  );
};
