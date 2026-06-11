import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioSetupForm } from "@/components/portfolios/portfolio-setup-form";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function PortfolioSetupPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Card className="border-white/10 bg-white/6">
          <CardHeader>
            <CardTitle>Create a portfolio</CardTitle>
            <CardDescription>
              Save a filtered portfolio definition so the dashboard can render the right charts
              for that slice of your claims data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSetupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
