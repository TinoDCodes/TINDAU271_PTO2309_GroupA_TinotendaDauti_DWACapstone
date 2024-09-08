import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
