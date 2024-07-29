import { Button } from '@/src/components/ui/Button';
import { routes } from '@/src/constants/routes';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';

interface UnitBannerProps {
  title: string;
  description: string;
}

export const UnitBanner: React.FC<UnitBannerProps> = ({
  title,
  description,
}) => {
  return (
    <div className="w-full rounded-xl bg-[#C47BFD] p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href={routes.LESSON}>
        <Button size="lg" className="hidden xl:flex">
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};
