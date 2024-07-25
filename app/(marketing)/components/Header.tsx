import { HeroAvatar } from '@/components/HeroAvatar';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen mx-auto flex items-center justify-between h-full">
        <HeroAvatar />

        <Button size="lg" variant="ghost">
          Login
        </Button>
      </div>
    </header>
  );
};
