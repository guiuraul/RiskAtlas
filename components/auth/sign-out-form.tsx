"use client";

import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function SignOutForm({ className }: { className?: string } = {}) {
  return (
    <form action={signOutAction}>
      <Button
        variant="secondary"
        type="submit"
        className={[
          "h-11 rounded-full border border-white/8 bg-slate-900/55 px-5 text-sm font-medium text-white/90 hover:bg-slate-800/70 hover:text-white",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Sign out
      </Button>
    </form>
  );
}
