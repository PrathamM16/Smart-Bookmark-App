"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@/types";

interface NavbarProps {
  user: User;
}

export const Navbar = ({ user }: NavbarProps) => {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600">🔖 Bookmarks</span>
        </div>
        <div className="flex items-center gap-4">
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              alt={user.full_name ?? "User"}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm text-gray-600 hidden sm:block">
            {user.full_name ?? user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};