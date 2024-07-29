import Image from 'next/image';
import { Button } from './ui/Button';
import Link from 'next/link';
import { routes } from '../constants/routes';

interface PromoProps {}

export const Promo: React.FC<PromoProps> = ({}) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/icons/unlimited.svg" alt="Pro" height={26} width={26} />
          <h3>Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more!</p>
      </div>
      <Button variant="super" className="w-full" size="lg" asChild>
        <Link href={routes.SHOP}>Upgrade today</Link>
      </Button>
    </div>
  );
};
