import * as React from "react";
import { cn } from "@/lib/utils";

// Simplified tooltip implementation that doesn't depend on @radix-ui/react-tooltip
// to avoid React version mismatch issues

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, ...props }, ref) => {
  if (props.asChild) {
    return <>{children}</>;
  }
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number }
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  // Render nothing - tooltips are non-essential UI
  return null;
});
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
