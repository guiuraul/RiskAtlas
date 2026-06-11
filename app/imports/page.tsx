import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/supabase/server";
import { ImportClaimsForm } from "@/components/imports/import-claims-form";

export default async function ImportsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Card className="border-white/10 bg-white/6">
          <CardHeader>
            <CardTitle>Import insurance claims</CardTitle>
            <CardDescription>
              Upload the CSV.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImportClaimsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

