"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SiteFooterProps = {
  children: ReactNode;
  className?: string;
};

export function SiteFooter({ children, className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "mx-auto w-full max-w-7xl px-4 pb-1 pt-4 text-center text-xs text-slate-400/70 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </footer>
  );
}
