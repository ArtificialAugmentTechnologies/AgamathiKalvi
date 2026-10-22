import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'rounded-2xl border bg-card transition-colors data-[state=open]:border-primary/40',
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[15px] font-semibold transition-colors outline-none hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:px-6 sm:text-base',
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
          <Plus className="size-4" aria-hidden />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('px-5 pb-5 leading-relaxed sm:px-6 sm:text-[15px]', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
