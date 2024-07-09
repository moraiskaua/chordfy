import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide',
  {
    variants: {
      variant: {
        default:
          'bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-secondary hover:text-slate-600',
        primary:
          'bg-primary text-primary-foreground border-secondary/5 hover:bg-primary/90 border-2 border-b-4 active:border-b-2',
        outline: 'bg-white text-primary hover:bg-secondary',
        danger:
          'bg-rose-700/90 text-white border-rose-700 hover:bg-rose-700/80 border-2 border-b-4 active:border-b-2',
        dangerOutline: 'bg-white text-rose-700 hover:bg-secondary',
        super:
          'bg-[#8152AB] text-white border-[#C47BFD] hover:bg-[#8152AB]/90 border-2 border-b-4 active:border-b-2',
        superOutline: 'bg-white text-[#8152AB] hover:bg-secondary',
        ghost:
          'bg-transparent text-slate-600 border-transparent hover:bg-slate-100',
        sidebar:
          'bg-transparent border-transparent hover:bg-primary/5 transition-none',
        sidebarActive:
          'bg-primary/15 border-2 border-primary/15 hover:bg-primary/20 transition-none',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-10 w-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };