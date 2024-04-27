import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
// import { cn } from "../../utils/cn";
import cn from "../../utils/cn";
// Label component extends from shadcnui - https://ui.shadcn.com/docs/components/label


const Label = React.forwardRef(function Label({ className, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
