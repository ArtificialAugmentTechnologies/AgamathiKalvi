import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// shadcn-style navigation menu without a shared viewport: each panel drops down
// directly beneath its own trigger.

export function NavigationMenu({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn('relative flex items-center', className)}
      {...props}
    />
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      className={cn('flex list-none items-center gap-0.5', className)}
      {...props}
    />
  );
}

export function NavigationMenuItem({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item className={cn('relative', className)} {...props} />;
}

export const navItemClass =
  'inline-flex h-10 items-center gap-1 rounded-full border border-transparent px-3.5 text-sm whitespace-nowrap font-medium text-foreground/80 transition-colors hover:border-primary hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none data-[active]:text-foreground data-[state=open]:border-primary data-[state=open]:bg-accent data-[state=open]:text-foreground';

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger className={cn(navItemClass, 'group', className)} {...props}>
      {children}
      <ChevronDown
        className="size-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-2xl border bg-popover p-2 text-popover-foreground shadow-2xl shadow-black/30',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    />
  );
}

export const NavigationMenuLink = NavigationMenuPrimitive.Link;
