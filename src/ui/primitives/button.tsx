import type { ComponentProps } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        outline: "border bg-background text-foreground hover:bg-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };
export function Button({
  className,
  variant,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant }), className)}
      {...(!asChild ? { type: type ?? "button" } : {})}
      {...props}
    />
  );
}
