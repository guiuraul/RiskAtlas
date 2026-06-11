import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to review your saved portfolios and pick up where you left off"
      panelLabel="Sign in"
      panelTitle="Continue where you left off"
      panelDescription="Open your saved work, switch between portfolios, and pick up the review in seconds"
      footer="Built for private insurance portfolio analysis"
    >
      <SignInForm />
    </AuthShell>
  );
}
