import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm";
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "h-11 px-5",
        size === "sm" && "h-9 px-4 text-xs",
        variant === "default" &&
          "border-cyan-300/30 bg-cyan-300/15 text-cyan-50 shadow-[0_0_0_1px_rgba(34,211,238,0.08)] hover:bg-cyan-300/20",
        variant === "secondary" &&
          "border-white/10 bg-white/8 text-slate-50 hover:bg-white/12",
        variant === "ghost" && "border-transparent bg-transparent hover:bg-white/8",
        className
      )}
      {...props}
    />
  );
}
