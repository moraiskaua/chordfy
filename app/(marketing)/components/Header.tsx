import Avatar from '@/components/Avatar';
import { HeroAvatar } from '@/components/HeroAvatar';
import { Button } from '@/components/ui/Button';
import { routes } from '@/constants/routes';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  user?: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen mx-auto flex items-center justify-between h-full">
        <HeroAvatar />

        {user ? (
          <Avatar user={user} />
        ) : (
          <Link href={routes.AUTH}>
            <Button size="lg" variant="ghost">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};
