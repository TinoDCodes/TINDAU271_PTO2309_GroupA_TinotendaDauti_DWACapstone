"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**
 * Handles user login using Supabase authentication with email and password.
 *
 * 1. Retrieves the email and password from the provided form data.
 * 2. Attempts to sign in the user using Supabase Auth's `signInWithPassword` method.
 * 3. If an error occurs during login, the user is redirected back to the login page with an error message.
 * 4. On successful login, it revalidates the cache for the homepage layout and redirects the user to the homepage.
 *
 * @param {FormData} formData - The form data containing the user's email and password.
 *
 * @returns {Promise<void>} - The function does not return a value, but handles redirects upon success or failure.
 */
export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/login?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
