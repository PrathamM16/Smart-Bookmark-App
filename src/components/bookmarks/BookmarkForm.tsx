"use client";

import { useState } from "react";
import { CreateBookmarkPayload } from "@/types";

interface BookmarkFormProps {
  onSubmit: (payload: CreateBookmarkPayload) => Promise<void>;
}

const initialState: CreateBookmarkPayload = { title: "", url: "" };

export const BookmarkForm = ({ onSubmit }: BookmarkFormProps) => {
  const [form, setForm] = useState<CreateBookmarkPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      setError("Both title and URL are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(form);
      setForm(initialState);
    } catch {
      setError("Failed to save bookmark. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Add New Bookmark
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          type="url"
          name="url"
          placeholder="https://example.com"
          value={form.url}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? "Saving..." : "Add Bookmark"}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}
    </form>
  );
};