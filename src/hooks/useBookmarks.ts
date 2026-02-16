"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookmarkService } from "@/services/bookmarkService";
import { Bookmark, CreateBookmarkPayload } from "@/types";

export const useBookmarks = (userId: string) => {
  const supabase = createClient();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<any>(null);

  /**
   * ----------------------------
   * Initial Load
   * ----------------------------
   */
  const loadBookmarks = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await BookmarkService.fetchAll(supabase, userId);
      setBookmarks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load bookmarks"
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  /**
   * ----------------------------
   * Realtime Subscription
   * ----------------------------
   */
  useEffect(() => {
    if (!userId) return;

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase
      .channel(`bookmarks-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setBookmarks((prev) => {
            switch (payload.eventType) {
              case "INSERT":
                if (prev.find((b) => b.id === payload.new.id)) {
                  return prev;
                }
                return [payload.new as Bookmark, ...prev];

              case "UPDATE":
                return prev.map((b) =>
                  b.id === payload.new.id
                    ? (payload.new as Bookmark)
                    : b
                );

              case "DELETE":
                return prev.filter(
                  (b) => b.id !== payload.old.id
                );

              default:
                return prev;
            }
          });
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId, supabase]);

  /**
   * ----------------------------
   * Add Bookmark (Optimistic)
   * ----------------------------
   */
  const addBookmark = async (payload: CreateBookmarkPayload) => {
    try {
      setError(null);

      const newBookmark = await BookmarkService.create(
        supabase,
        userId,
        payload
      );

      // 🔥 Immediate update for same tab
      setBookmarks((prev) => {
        if (prev.find((b) => b.id === newBookmark.id)) {
          return prev;
        }
        return [newBookmark, ...prev];
      });

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add bookmark";
      setError(message);
      throw err;
    }
  };

  /**
   * ----------------------------
   * Remove Bookmark
   * ----------------------------
   */
  const removeBookmark = async (bookmarkId: string) => {
    try {
      setError(null);

      await BookmarkService.delete(supabase, bookmarkId);

      // Optional: instant UI update
      setBookmarks((prev) =>
        prev.filter((b) => b.id !== bookmarkId)
      );

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete bookmark";
      setError(message);
      throw err;
    }
  };

  return {
    bookmarks,
    isLoading,
    error,
    addBookmark,
    removeBookmark,
  };
};
