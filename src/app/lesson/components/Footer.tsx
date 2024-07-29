import { useKey, useMedia } from 'react-use';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/src/lib/cn';
import { Button } from '@/src/components/ui/Button';
import { routes } from '@/src/constants/routes';

interface FooterProps {
  onCheck: () => void;
  status: 'CORRECT' | 'WRONG' | 'NONE' | 'COMPLETED';
  disabled?: boolean;
  lessonId?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onCheck,
  status,
  disabled,
  lessonId,
}) => {
  const isMobile = useMedia('(max-width): 1024px');
  useKey('Enter', onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        'lg:h-[140px] h-[100px] border-t-2',
        status === 'CORRECT' && 'border-transparent bg-green-100',
        status === 'WRONG' && 'border-transparent bg-rose-100',
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === 'CORRECT' && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="size-6 lg:size-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === 'WRONG' && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="size-6 lg:size-10 mr-4" />
            Try again.
          </div>
        )}
        {status === 'COMPLETED' && (
          <Button
            variant="default"
            size={isMobile ? 'sm' : 'lg'}
            onClick={() =>
              (window.location.href = `${routes.LESSON}/${lessonId}`)
            }
          >
            Practice again
          </Button>
        )}
        <Button
          disabled={disabled}
          className={cn(
            'ml-auto',
            status === 'CORRECT' &&
              'border-green-300 hover:bg-green-500/80 bg-green-500',
          )}
          onClick={onCheck}
          size={isMobile ? 'sm' : 'lg'}
          variant={status === 'WRONG' ? 'danger' : 'primary'}
        >
          {status === 'NONE' && 'Check'}
          {status === 'CORRECT' && 'Next'}
          {status === 'WRONG' && 'Retry'}
          {status === 'COMPLETED' && 'Continue'}
        </Button>
      </div>
    </footer>
  );
};
