"use client";

import { useActionState } from "react";

import {
  importInsuranceClaimsAction,
} from "@/app/actions/imports";
import { initialImportActionState } from "@/app/actions/imports-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ImportClaimsForm() {
  const [state, action, pending] = useActionState(
    importInsuranceClaimsAction,
    initialImportActionState
  );

  return (
    <form action={action} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="file" className="text-slate-100">
          Claims file
        </Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept=".csv,text/csv"
          required
          className="h-9 cursor-pointer rounded-2xl border-white/10 bg-slate-950/35 px-3 py-1.5 text-sm text-white file:mr-2 file:h-6 file:rounded-lg file:border-0 file:bg-cyan-300/15 file:px-3 file:text-[11px] file:font-medium file:text-white file:whitespace-nowrap placeholder:text-slate-500 focus:border-cyan-300/35"
        />
      </div>

      {state.message ? (
        <div
          className={[
            "rounded-2xl border px-4 py-3 text-sm",
            state.status === "success"
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
              : "border-rose-300/20 bg-rose-300/10 text-rose-50",
          ].join(" ")}
          >
          <p className="font-medium">{state.message}</p>
          {state.details?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-inherit/90">
              {state.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <Button type="submit" disabled={pending} className="h-10 w-full rounded-full">
        {pending ? "Importing..." : "Import CSV"}
      </Button>
    </form>
  );
}
