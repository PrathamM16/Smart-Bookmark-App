"use client";

import { useState } from "react";
import { Bookmark } from "@/types";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: string) => Promise<void>;
}

export const BookmarkCard = ({ bookmark, onDelete }: BookmarkCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(bookmark.id);
    } catch {
      setIsDeleting(false);
    }
  };

  const getHostname = () => {
    try {
      return new URL(bookmark.url).hostname.replace("www.", "");
    } catch {
      return bookmark.url;
    }
  };

  const hostname = getHostname();

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {bookmark.title}
          </p>

          {/* ✅ FIXED ANCHOR TAG */}
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-500 hover:underline truncate block"
          >
            {hostname}
          </a>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete bookmark"
        className="ml-3 flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
