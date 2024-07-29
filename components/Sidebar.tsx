'use client';

import { cn } from '@/lib/cn';
import { HeroAvatar } from './HeroAvatar';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { SidebarItem } from '@/components/SidebarItem';
import Avatar from './Avatar';
import { User } from 'next-auth';
import { Button } from './ui/Button';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  className?: string;
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, user }) => {
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
        <SidebarItem
          label="Learn"
          href={routes.LEARN}
          icon="/icons/learn.svg"
        />
        <SidebarItem
          label="Leaderboard"
          href={routes.LEADERBOARD}
          icon="/icons/leaderboard.svg"
        />
        <SidebarItem
          label="Quests"
          href={routes.QUESTS}
          icon="/icons/quests.svg"
        />
        <SidebarItem label="Shop" href={routes.SHOP} icon="/icons/shop.svg" />
      </div>

      <div className="flex items-center justify-between">
        <Avatar user={user} />
        <Button onClick={() => signOut()} variant="danger">
          Exit
        </Button>
      </div>
    </div>
  );
};
