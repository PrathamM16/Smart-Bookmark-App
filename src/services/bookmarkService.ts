import { SupabaseClient } from "@supabase/supabase-js";
import { Bookmark, CreateBookmarkPayload } from "@/types";

export const BookmarkService = {
  async fetchAll(supabase: SupabaseClient, userId: string): Promise<Bookmark[]> {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async create(
    supabase: SupabaseClient,
    userId: string,
    payload: CreateBookmarkPayload
  ): Promise<Bookmark> {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert([{ ...payload, user_id: userId }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async delete(supabase: SupabaseClient, bookmarkId: string): Promise<void> {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmarkId);

    if (error) throw new Error(error.message);
  },
};