import { cn } from '@/src/lib/cn';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}

export const Input: React.FC<InputProps> = ({
  id,
  type,
  disabled,
  required,
  errors,
  placeholder,
  register,
}) => {
  return (
    <input
      id={id}
      type={type}
      autoComplete={id}
      disabled={disabled}
      {...register(id, { required })}
      placeholder={placeholder}
      className={cn(
        `bg-zinc-200 p-2 rounded-md outline-none`,
        errors[id] && 'focus:ring-rose-500',
        disabled && 'opacity-50 cursor-default',
      )}
    />
  );
};
