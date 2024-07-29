import { cn } from '@/src/lib/cn';
import { ChallengeType } from '@prisma/client';
import Image from 'next/image';
import { useCallback } from 'react';
import { useAudio, useKey } from 'react-use';

interface CardProps {
  id: string;
  text: string;
  image?: string;
  audio: string;
  shortcut: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
  status: 'CORRECT' | 'WRONG' | 'NONE';
  type: ChallengeType;
}

export const Card: React.FC<CardProps> = ({
  text,
  image,
  audio,
  shortcut,
  selected,
  disabled,
  onClick,
  status,
  type,
}) => {
  const [sound, _, controls] = useAudio({ src: audio || '' });

  const handleClick = useCallback(() => {
    if (disabled) return;

    controls.play();
    onClick();
  }, [disabled, controls, onClick]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      className={cn(
        'g-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2',
        selected && 'border-[#8152AB]/35 bg-[#C47BFD]/35 hover:bg-[#C47BFD]/25',
        selected &&
          status === 'CORRECT' &&
          'border-green-300 bg-green-100 hover:bg-green-100',
        selected &&
          status === 'WRONG' &&
          'border-rose-300 bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none opacity-50',
        type === 'ASSIST' && 'lg:p-3 w-full',
      )}
      onClick={handleClick}
    >
      {sound}
      {image == '' && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={image} alt={text} fill />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          type === 'ASSIST' && 'flex-row-reverse',
        )}
      >
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            'text-neutral-600 text-sm lg:text-base',
            selected && 'text-[#8152AB]/75',
            selected && status === 'CORRECT' && 'text-green-500',
            selected && status === 'WRONG' && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            'lg:size-[30px] size-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-sm font-semibold',
            selected && 'border-[#8152AB]/75 text-[#8152AB]/75',
            selected &&
              status === 'CORRECT' &&
              'border-green-500 text-green-500',
            selected && status === 'WRONG' && 'border-rose-400 text-rose-400',
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
