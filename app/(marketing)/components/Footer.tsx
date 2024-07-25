'use client';
import { Button } from '@/components/ui/Button';

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button
          size="lg"
          variant="ghost"
          onClick={() =>
            window.open('https://github.com/moraiskaua', '_blank', 'noopener')
          }
        >
          Developed by Kauã Morais
        </Button>
      </div>
    </footer>
  );
};
