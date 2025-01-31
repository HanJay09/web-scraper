"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition",
      props.checked ? "bg-gray-700" : "bg-gray-300",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block h-4 w-4 transform rounded-full bg-white shadow transition",
        props.checked ? "translate-x-6" : "translate-x-1"
      )}
    />
  </SwitchPrimitive.Root>
));

Switch.displayName = "Switch";
