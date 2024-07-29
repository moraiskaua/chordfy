import { Button } from '@/src/components/ui/Button';
import { routes } from '@/src/constants/routes';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href={routes.COURSES}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="size-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg">{title}</h1>
      <div />
    </div>
  );
};
