import "server-only";

import { desc, eq, sql } from "drizzle-orm";

import { withUserContext } from "@/lib/db";
import { claimRecords, portfolios, type PortfolioSelect } from "@/lib/db/schema";

export async function getUserPortfolios(userId: string): Promise<PortfolioSelect[]> {
  return withUserContext(userId, async (tx) =>
    tx
      .select()
      .from(portfolios)
      .where(eq(portfolios.userId, userId))
      .orderBy(desc(portfolios.createdAt))
  );
}

export async function getUserIncidentYears(userId: string): Promise<number[]> {
  const rows = await withUserContext(userId, async (tx) =>
    tx
      .selectDistinct({
        year: sql<number>`extract(year from ${claimRecords.incidentDate})::int`,
      })
      .from(claimRecords)
      .where(eq(claimRecords.userId, userId))
      .orderBy(desc(sql<number>`extract(year from ${claimRecords.incidentDate})::int`))
  );

  return rows
    .map((row) => row.year)
    .filter((year): year is number => Number.isFinite(year));
}
