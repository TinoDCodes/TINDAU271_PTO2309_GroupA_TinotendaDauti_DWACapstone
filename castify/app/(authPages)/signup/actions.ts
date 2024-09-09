"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**
 * Handles user signup using Supabase authentication with email and password.
 *
 * 1. Retrieves the email and password from the provided form data.
 * 2. Checks if the password and password confirmation match. If they don't, redirects the user back to the signup page with an error.
 * 3. Attempts to sign up the user using Supabase Auth's `signUp` method.
 * 4. If an error occurs during signup, the user is redirected back to the signup page with the error message.
 * 5. On successful signup, it revalidates the cache for the homepage layout and redirects the user to the login page with a success message.
 *
 * @param {FormData} formData - The form data containing the user's email and passwords (password and password confirmation).
 *
 * @returns {Promise<void>} - The function does not return a value, but handles redirects upon success or failure.
 */
export async function signup(formData: FormData) {
  const supabase = createClient();

  const password1 = formData.get("password") as string;
  const password2 = formData.get("password2") as string;

  if (password1 !== password2)
    redirect(`/signup?error=${encodeURI("Passwords do not match.")}`);

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/signup?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/login?signup=success");
}
