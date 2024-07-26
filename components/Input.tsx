import { cn } from '@/lib/utils';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

export const Input: React.FC<InputProps> = ({
  id,
  type,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <input
      id={id}
      type={type}
      autoComplete={id}
      disabled={disabled}
      {...register(id, { required })}
      className={cn(
        `bg-zinc-200 p-2 rounded-md outline-none`,
        errors[id] && 'focus:ring-rose-500',
        disabled && 'opacity-50 cursor-default',
      )}
    />
  );
};
