import { Bookmark, CreateBookmarkPayload } from "@/types";

export class BookmarkService {
  static async fetchAll(supabase: any, userId: string): Promise<Bookmark[]> {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  }

  static async create(
    supabase: any,
    userId: string,
    payload: CreateBookmarkPayload
  ): Promise<Bookmark> {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        ...payload,
        user_id: userId,
      })
      .select()
      .single(); // 🔥 IMPORTANT

    if (error) throw error;

    return data;
  }

  static async delete(supabase: any, bookmarkId: string) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmarkId);

    if (error) throw error;
  }

  static async update(
    supabase: any,
    bookmarkId: string,
    payload: Partial<CreateBookmarkPayload>
  ): Promise<Bookmark> {
    const { data, error } = await supabase
      .from("bookmarks")
      .update(payload)
      .eq("id", bookmarkId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}
