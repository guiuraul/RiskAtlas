import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function SignUpPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title="Create your account"
      description="Set up a private workspace for your insurance portfolios"
      panelLabel="Get started"
      panelTitle="Set up your workspace in a few minutes"
      panelDescription="Create your account, save your first portfolio, and come back whenever you need to review the results"
      footer="Built for private insurance portfolio analysis."
    >
      <SignUpForm />
    </AuthShell>
  );
}
