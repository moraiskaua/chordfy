import { cn } from '@/lib/utils';
import { ChallengeOption, ChallengeType } from '@prisma/client';

interface ChallengeProps {
  options: ChallengeOption[];
  onSelect: (id: string) => void;
  status: 'CORRECT' | 'WRONG' | 'NONE';
  selectedOption?: number;
  disabled?: boolean;
  type: ChallengeType;
}

export const Challenge: React.FC<ChallengeProps> = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}) => {
  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, index) => (
        <div key={index}>{JSON.stringify(option)}</div>
      ))}
    </div>
  );
};
