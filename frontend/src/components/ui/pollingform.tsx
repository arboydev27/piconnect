"use client";

import { X, PlusCircle } from "lucide-react";
import { useState } from "react";

type PollingProps = {
  /** Optional handler fired when the user presses “Post Poll” */
  onPost?: (payload: { question: string; options: string[] }) => void;
  /** Close handler from the parent overlay */
  onClose?: () => void;
};

/**
 * <PollingForm /> – modal‑style component for creating a poll.
 *
 * Usage: render it inside a full‑screen overlay (same size as the Dropzone card).
 */
export default function PollingForm({ onPost, onClose }: PollingProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]); // at least 2
  const [posted, setPosted] = useState(false);

  /* Add another option input */
  const addOption = () => setOptions((prev) => [...prev, ""]);

  /* Update a specific option text */
  const updateOption = (idx: number, value: string) =>
    setOptions((prev) => prev.map((opt, i) => (i === idx ? value : opt)));

  /* Post Poll */
  const handlePost = () => {
    setPosted(true);
    onPost?.({ question, options: options.filter((o) => o.trim()) });
    // auto‑close after post? leave that to parent
  };

  const readyToPost =
    question.trim().length > 0 &&
    options.filter((o) => o.trim().length > 0).length >= 2;

  return (
    <div className="flex items-center justify-center w-screen px-4">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Question */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question..."
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>

        {/* Options list */}
        <div className="mb-6 space-y-3">
          <p className="text-sm font-medium text-gray-700">Options</p>
          {options.map((opt, idx) => (
            <input
              key={idx}
              value={opt}
              onChange={(e) => updateOption(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
            />
          ))}

          {/* Add option button */}
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <PlusCircle className="w-4 h-4" />
            Add another option
          </button>
        </div>

        {/* Post button */}
        <button
          type="button"
          disabled={!readyToPost || posted}
          onClick={handlePost}
          className={`w-full rounded-lg py-2 text-white ${
            !readyToPost
              ? "bg-gray-400 cursor-not-allowed"
              : posted
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {posted ? "Posted!" : "Post Poll"}
        </button>
      </div>
    </div>
  );
}
