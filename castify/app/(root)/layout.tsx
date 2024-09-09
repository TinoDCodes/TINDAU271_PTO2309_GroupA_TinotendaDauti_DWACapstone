import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";

import { createClient } from "@/utils/supabase/server";

export default async function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <main>
      <Header userData={data} />
      <SearchInput />
      {children}
    </main>
  );
}
