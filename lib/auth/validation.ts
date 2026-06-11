import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters."),
  birthDate: z
    .string()
    .trim()
    .min(1, "Birth date is required.")
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Enter your birth date as mm/dd/yyyy using numbers only."
    )
    .refine((value) => parseBirthDateInput(value) !== null, "Enter a valid birth date."),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .trim(),
});

export const signInSchema = z.object({
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  password: z.string().min(1, "Password is required.").trim(),
});

export function parseBirthDateInput(birthDate: string) {
  const match = birthDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, monthText, dayText, yearText] = match;
  const month = Number(monthText);
  const day = Number(dayText);
  const year = Number(yearText);

  const birth = new Date(Date.UTC(year, month - 1, day));

  if (
    Number.isNaN(birth.getTime()) ||
    birth.getUTCFullYear() !== year ||
    birth.getUTCMonth() !== month - 1 ||
    birth.getUTCDate() !== day
  ) {
    return null;
  }

  return birth;
}

export function getAgeFromBirthDate(
  birthDate: string,
  referenceDate = new Date()
) {
  const birth = parseBirthDateInput(birthDate);

  if (!birth) {
    return null;
  }

  const today = new Date(
    Date.UTC(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      referenceDate.getUTCDate()
    )
  );

  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
  const dayDiff = today.getUTCDate() - birth.getUTCDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

export function isAtLeast18(birthDate: string, referenceDate = new Date()) {
  const age = getAgeFromBirthDate(birthDate, referenceDate);

  if (age === null) {
    return false;
  }

  return age >= 18;
}

export function isAtMost100(birthDate: string, referenceDate = new Date()) {
  const age = getAgeFromBirthDate(birthDate, referenceDate);

  if (age === null) {
    return false;
  }

  return age <= 100;
}

export type AuthFormState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors?: {
    fullName?: string[];
    birthDate?: string[];
    email?: string[];
    password?: string[];
  };
};

export const initialAuthState: AuthFormState = {
  status: "idle",
  message: "",
};
