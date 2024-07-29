'use client';

import { Button } from '@/src/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  icon: string;
  href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  href,
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'sidebarActive' : 'sidebar'}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image src={icon} alt={label} className="mr-5" height={32} width={32} />
        {label}
      </Link>
    </Button>
  );
};
