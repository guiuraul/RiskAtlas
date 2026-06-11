"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";

import { signUpAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthState } from "@/lib/auth/validation";

function formatBirthDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function handleBirthDateKeyDown(event: KeyboardEvent<HTMLInputElement>) {
  const allowedControlKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
  ];

  if (allowedControlKeys.includes(event.key)) {
    return;
  }

  if ((event.metaKey || event.ctrlKey) && ["a", "c", "v", "x"].includes(event.key.toLowerCase())) {
    return;
  }

  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initialAuthState);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  return (
    <Card className="w-full border-white/10 bg-slate-950/40 text-white shadow-none">
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-100">
              Full name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Alex Pop"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-slate-100">
              Birth date
            </Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              placeholder="mm/dd/yyyy"
              value={birthDate}
              onChange={(event) => setBirthDate(formatBirthDateInput(event.target.value))}
              onKeyDown={handleBirthDateKeyDown}
              maxLength={10}
              required
              aria-label="Birth date"
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-100">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-100">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
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
              {state.message}
            </div>
          ) : null}

          <Button
            type="submit"
            className="w-full bg-sky-400/25 text-white shadow-sm shadow-sky-500/15 hover:bg-sky-400/30"
            disabled={pending}
          >
            Create account
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-300">
          Already have an account?{" "}
          <Link href="/sign-in" className="group inline-flex font-medium text-cyan-100 hover:text-white">
            <span className="inline-flex flex-col items-center">
              <span>Sign in</span>
              <span className="mt-0.5 h-px w-full rounded-full bg-sky-300/70 transition-opacity group-hover:bg-sky-200/90" />
            </span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
