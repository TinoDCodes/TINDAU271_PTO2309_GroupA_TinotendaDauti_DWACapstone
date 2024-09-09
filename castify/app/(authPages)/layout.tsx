import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Layout component for authentication-related pages (e.g., login, signup).
 *
 * 1. Initializes the Supabase client and checks if a user is already authenticated.
 * 2. If the user is authenticated, redirects them to the homepage (`/`), preventing access to authentication pages when already logged in.
 * 3. If no user is authenticated, renders the authentication page's child content (login or signup forms).
 *
 */
export default async function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!error && data.user) redirect("/");

  return <div>{children}</div>;
}
