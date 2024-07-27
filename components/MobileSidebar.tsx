import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { Sidebar } from '@/components/Sidebar';
import { Menu } from 'lucide-react';
import { getMySession } from '@/helpers/getMySession';

export const MobileSidebar = async () => {
  const session = await getMySession();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>

      <SheetContent className="p-0 z-[100]" side="left">
        <Sidebar user={session?.user!} />
      </SheetContent>
    </Sheet>
  );
};
