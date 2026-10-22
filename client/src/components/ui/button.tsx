import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[color,background-color,box-shadow,transform] duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_8px_24px_-8px] shadow-primary/50 hover:bg-primary/90 hover:shadow-primary/70',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-accent',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'rounded-none px-0 text-primary underline-offset-4 hover:underline',
        whatsapp: 'bg-whatsapp text-[#05230f] hover:bg-whatsapp/90',
        ink: 'bg-ink-foreground text-ink hover:bg-ink-foreground/90',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'size-10',
        'icon-sm': 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a router <Link>) with button styles. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';
