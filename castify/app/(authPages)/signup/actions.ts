"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = createClient();

  let password1 = formData.get("password") as string;
  let password2 = formData.get("password2") as string;

  if (password1 !== password2)
    redirect(`/signup?error=${encodeURI("Passwords do not match.")}`);

  // type-casting here for convenience
  // in practice, you should validate your inputs
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
