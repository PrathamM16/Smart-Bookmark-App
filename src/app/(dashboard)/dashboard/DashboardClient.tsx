"use client";

import { BookmarkForm } from "@/components/bookmarks/BookmarkForm";
import { BookmarkList } from "@/components/bookmarks/BookmarkList";
import { useBookmarks } from "@/hooks/useBookmarks";

interface DashboardClientProps {
  userId: string;
}

export const DashboardClient = ({ userId }: DashboardClientProps) => {
  const { bookmarks, isLoading, error, addBookmark, removeBookmark } =
    useBookmarks(userId);

  return (
    <div className="flex flex-col gap-6">
      <BookmarkForm onSubmit={addBookmark} />
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Your Bookmarks
          </h2>
          {!isLoading && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {bookmarks.length} saved
            </span>
          )}
        </div>
        <BookmarkList
          bookmarks={bookmarks}
          isLoading={isLoading}
          onDelete={removeBookmark}
        />
      </section>
    </div>
  );
};