import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, memo } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "w-full active:scale-95 flex flex-row items-center justify-center rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default: "bg-primary text-zinc-100 dark:bg-primary-dark",
        destructive: "text-white bg-error dark:bg-destructive-dark",
        outline:
          "bg-muted text-zinc-900 dark:bg-muted-dark border border-muted dark:border-muted-dark",
        subtle: "bg-secondary text-zinc-900",
        ghost:
          "bg-transparent focus:bg-muted text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        round: "bg-primary text-zinc-100 dark:bg-primary-dark rounded-full",
        floating:
          "bg-black rounded-full absolute bottom-8 right-8 z-10  shadow-md flex items-center justify-center",
      },
      size: {
        default: "py-4 px-4",
        sm: "h-9 px-2 rounded",
        xs: "h-8 px-1.5 rounded-sm",
        lg: "h-11 px-8 rounded-xl",
        floatingLg: "h-[70px] w-[70px] rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  className?: string;
}

const Button = memo(
  forwardRef<TouchableOpacity, ButtonProps>(
    ({ className, children, variant, isLoading, size, ...props }, ref) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <ActivityIndicator className={`w-8 h-6`} color="white" />
          ) : (
            children
          )}
        </TouchableOpacity>
      );
    }
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };

