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
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">CSV file</Label>
        <Input id="file" name="file" type="file" accept=".csv,text/csv" required />
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
          {state.message}
        </div>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Importing..." : "Import CSV"}
      </Button>
    </form>
  );
}
