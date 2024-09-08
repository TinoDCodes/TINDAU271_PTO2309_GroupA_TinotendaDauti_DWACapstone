import { Header } from "@/components/Header";

import { createClient } from "@/utils/supabase/server";

export default async function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <main>
      <Header userData={data} />
      {children}
    </main>
  );
}
