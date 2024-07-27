import { cn } from '@/lib/utils';
import { ChallengeOption, ChallengeType } from '@prisma/client';
import { Card } from './Card';

interface ChallengeProps {
  options: ChallengeOption[];
  onSelect: (id: string) => void;
  status: 'CORRECT' | 'WRONG' | 'NONE';
  selectedOption?: string;
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
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          image={option.image}
          audio={option.audio}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          disabled={disabled}
          onClick={() => onSelect(option.id)}
          status={status}
          type={type}
        />
      ))}
    </div>
  );
};
