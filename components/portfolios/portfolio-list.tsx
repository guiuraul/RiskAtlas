import { Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortfolioSelect } from "@/lib/db/schema";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCriteria(portfolio: PortfolioSelect) {
  const filters = portfolio.filters as {
    policyState?: string | null;
    insuredSex?: string | null;
    incidentState?: string | null;
    autoMake?: string | null;
    incidentYear?: number | null;
    maxTotalClaimAmount?: number | null;
  };

  const parts = [
    filters.policyState ? `Policy state: ${filters.policyState}` : null,
    filters.insuredSex ? `Gender: ${filters.insuredSex}` : null,
    filters.incidentState ? `Incident state: ${filters.incidentState}` : null,
    filters.autoMake ? `Make: ${filters.autoMake}` : null,
    filters.incidentYear ? `Year: ${filters.incidentYear}` : null,
    filters.maxTotalClaimAmount
      ? `Max claims: ${currencyFormatter.format(filters.maxTotalClaimAmount)}`
      : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : "No filters set yet";
}

export function PortfolioList({ portfolios }: { portfolios: PortfolioSelect[] }) {
  return (
    <div className="space-y-4">
      {portfolios.length === 0 ? (
        <Card className="overflow-hidden border-dashed border-white/10 bg-slate-950/35">
          <CardHeader>
            <CardTitle className="text-base text-white">No portfolios yet</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {portfolios.map((portfolio) => (
            <Card
              key={portfolio.id}
              className="overflow-hidden border-cyan-300/15 bg-white/6 shadow-xl shadow-black/10"
            >
              <CardHeader className="space-y-2">
                <CardTitle className="text-base text-white">{portfolio.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Filter className="h-4 w-4 text-cyan-100" />
                  {formatCriteria(portfolio)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

