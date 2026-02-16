"use client";

import { Bookmark } from "@/types";
import { BookmarkCard } from "./BookmarkCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
}

export const BookmarkList = ({ bookmarks, isLoading, onDelete }: BookmarkListProps) => {
  if (isLoading) return <LoadingSpinner />;
  if (bookmarks.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};