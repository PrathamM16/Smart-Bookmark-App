import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function RootPage() {
  const supabase = await createClient();

  if (!supabase) {
    console.error("Supabase client failed — check .env.local");
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");
  else redirect("/login");
}