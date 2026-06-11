"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";

import {
  createPortfolioAction,
} from "@/app/actions/portfolios";
import { initialPortfolioActionState } from "@/app/actions/portfolios-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FieldNote({ children }: { children: ReactNode }) {
  return <p className="text-xs text-slate-300">{children}</p>;
}

export function PortfolioSetupForm() {
  const [state, action, pending] = useActionState(
    createPortfolioAction,
    initialPortfolioActionState
  );

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="name">Portfolio name</Label>
        <Input id="name" name="name" placeholder="BMW Ohio 2020" required />
        <FieldNote>Give it a short name you can recognize in the dashboard menu.</FieldNote>
      </div>

      <div className="space-y-2">
        <Label htmlFor="policyState">Policy state</Label>
        <Input id="policyState" name="policyState" placeholder="OH" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="insuredSex">Policyholder gender</Label>
        <Input id="insuredSex" name="insuredSex" placeholder="MALE or FEMALE" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="incidentState">Incident state</Label>
        <Input id="incidentState" name="incidentState" placeholder="OH" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="autoMake">Car brand</Label>
        <Input id="autoMake" name="autoMake" placeholder="BMW" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="incidentYear">Incident year</Label>
        <Input id="incidentYear" name="incidentYear" type="number" placeholder="2020" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxTotalClaimAmount">Max total claim amount</Label>
        <Input
          id="maxTotalClaimAmount"
          name="maxTotalClaimAmount"
          type="number"
          placeholder="5000"
        />
      </div>

      {state.message ? (
        <div
          className={[
            "md:col-span-2 rounded-2xl border px-4 py-3 text-sm",
            state.status === "success"
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
              : "border-rose-300/20 bg-rose-300/10 text-rose-50",
          ].join(" ")}
        >
          {state.message}
        </div>
      ) : null}

      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save portfolio"}
        </Button>
      </div>
    </form>
  );
}
