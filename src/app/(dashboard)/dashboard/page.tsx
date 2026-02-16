import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/ui/Navbar";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = {
    id: user!.id,
    email: user!.email ?? "",
    full_name: user!.user_metadata?.full_name,
    avatar_url: user!.user_metadata?.avatar_url,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={profile} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <DashboardClient userId={user!.id} />
      </main>
    </div>
  );
}