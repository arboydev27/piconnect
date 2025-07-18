// Combined single and multi-file upload view:
"use client";
import { UploadCloud, X, FileText, CheckCircle2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";

/* ────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────── */
interface QueuedFile {
  file: File; // original File object
  title: string;
  description: string;
  types: string[]; // ['pdf','video',…]
  uploaded: boolean; // success flag
}

/* ────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────── */
export default function Dropzone({
  onFilesSelected,
  onClose,
}: {
  onFilesSelected?: (f: FileList) => void;
  onClose?: () => void;
}) {
  /* ─ State ─ */
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [multiMode, setMultiMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─ Helpers ─ */
  const appendFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const incoming: QueuedFile[] = Array.from(fileList).map((f) => ({
        file: f,
        title: "",
        description: "",
        types: [],
        uploaded: false,
      }));

      onFilesSelected?.(fileList);
      setQueue((prev) => [...prev, ...incoming]);
    },
    [onFilesSelected]
  );

  const updateQueue = (index: number, updates: Partial<QueuedFile>) =>
    setQueue((prev) =>
      prev.map((q, i) => (i === index ? { ...q, ...updates } : q))
    );

  /* ─ Upload all (fake) ─ */
  const uploadAll = () => {
    setQueue((prev) =>
      prev.map((q) => ({
        ...q,
        uploaded: true,
      }))
    );
  };

  /* ─ View ─ */

  return multiMode ? (
    /* ─────────────────────────────
       MULTI‑FILE VIEW (existing queue UI)
    ───────────────────────────── */
    <div className="flex items-center justify-center w-screen px-4">
      {/* Card */}
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-red-500"
            aria-label="Close"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Drop‑zone header */}
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Upload multiple files
        </h2>

        {/* (keep your previous queue/appendFiles UI unchanged) */}
        <label
          htmlFor="dropzone-file"
          className={`relative flex flex-col items-center justify-center w-full h-44 mb-6 border-2 border-dashed rounded-lg cursor-pointer shadow-sm
            ${
              isHovering ? "bg-gray-100" : "bg-white"
            } border-gray-300 hover:bg-gray-50`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsHovering(true);
          }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsHovering(false);
            appendFiles(e.dataTransfer.files);
          }}
        >
          <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
          <p className="text-sm text-gray-600 text-center px-2">
            <span className="font-semibold">Click to upload</span> or drag and
            drop files
          </p>
          <p className="text-xs text-gray-500">PDF, video, audio — any size</p>

          <input
            id="dropzone-file"
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => appendFiles(e.target.files)}
          />
        </label>

        {/* Queue list */}
        {queue.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No files queued yet.
          </p>
        ) : (
          <div className="max-h-72 overflow-y-auto space-y-4 mb-4">
            {queue.map((q, idx) => (
              <div
                key={q.file.name + idx}
                className="border rounded p-4 space-y-3 shadow-sm"
              >
                {/* filename */}
                <div className="flex items-center gap-2">
                  {q.uploaded ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="break-all text-sm text-gray-700">
                    {q.file.name}
                  </span>
                </div>

                {/* title */}
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-500 placeholder-gray-400"
                  placeholder="Title"
                  value={q.title}
                  onChange={(e) => updateQueue(idx, { title: e.target.value })}
                />

                {/* description */}
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-500 placeholder-gray-400"
                  placeholder="Description"
                  value={q.description}
                  onChange={(e) =>
                    updateQueue(idx, { description: e.target.value })
                  }
                />

                {/* file type checkboxes */}
                <div className="flex gap-6">
                  {["pdf", "video", "audio"].map((t) => (
                    <label
                      key={t}
                      className="inline-flex items-center gap-1 text-xs capitalize text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={q.types.includes(t)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateQueue(idx, {
                            types: checked
                              ? [...q.types, t]
                              : q.types.filter((x) => x !== t),
                          });
                        }}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload all & back to single */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={uploadAll}
            disabled={queue.length === 0}
            className={`flex-1 rounded-lg py-2 text-white ${
              queue.length === 0
                ? "bg-gray-400 cursor-not-allowed" /* disabled */
                : queue.every((q) => q.uploaded) /* all done */
                ? "bg-green-500"
                : "bg-blue-600 hover:bg-blue-700" /* ready */
            }`}
            type="button"
          >
            {queue.every((q) => q.uploaded) ? "All Uploaded" : "Upload All"}
          </button>

          <button
            onClick={() => setMultiMode(false)}
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Single upload
          </button>
        </div>
      </div>
    </div>
  ) : (
    /* ─────────────────────────────
       SINGLE‑FILE VIEW
    ───────────────────────────── */
    <div className="flex items-center justify-center w-screen px-4">
      <div className="relative w-full max-w-md p-8 border rounded-lg bg-white shadow-lg">
        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-red-500"
            aria-label="Close"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Title */}
        <div className="w-full max-w-md">
          <div className="space-y-4 mb-4">
            {/* We use the first queued file or empty fields */}
            <SingleFileForm queue={queue} updateQueue={updateQueue} index={0} />
          </div>
          <label
            htmlFor="dropzone-file"
            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed shadow-sm rounded-lg cursor-pointer
                    ${isHovering ? "dark:bg-[#E2E8F0]" : "bg-white"}
                    border-gray-300 hover:bg-[#E2E8F0]`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsHovering(true);
            }}
            onDragLeave={() => setIsHovering(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsHovering(false);
              appendFiles(e.dataTransfer.files);
            }}
          >
            {queue.length > 0 && queue[0].uploaded ? (
              /* ✅ Success state */
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CheckCircle2 className="w-10 h-10 mb-2 text-green-500" />
                <p className="text-sm font-medium text-green-600">
                  Successfully added!
                </p>
              </div>
            ) : queue.length > 0 && queue[0].file.name ? (
              /* 📄 File‑selected state */
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileText className="w-8 h-8 mb-2 text-gray-500" />
                <p className="text-sm text-gray-700 text-center break-all px-2">
                  {queue[0].file.name}
                </p>
              </div>
            ) : (
              /* ☁️ Default prompt */
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800×400 px)
                </p>
              </div>
            )}

            <input
              id="dropzone-file"
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => appendFiles(e.target.files)}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              uploadAll();
            }}
            disabled={queue.length === 0 || (queue[0] && queue[0].uploaded)}
            className={`mt-4 w-full rounded-lg px-4 py-2 text-white ${
              queue.length === 0
                ? "bg-gray-400 cursor-not-allowed" /* disabled */
                : queue[0]?.uploaded /* success */
                ? "bg-green-500"
                : "bg-blue-600 hover:bg-blue-700" /* ready */
            }`}
          >
            {queue.length > 0 && queue[0].uploaded ? "Uploaded" : "Upload"}
          </button>
        </div>

        {/* Switch to multi‑file */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Are you uploading multiple files?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setMultiMode(true)}
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
}

/* Helper component for single file form inputs */
function SingleFileForm({
  queue,
  updateQueue,
  index,
}: {
  queue: QueuedFile[];
  updateQueue: (index: number, updates: Partial<QueuedFile>) => void;
  index: number;
}) {
  const q = queue[index] || {
    file: { name: "" } as File,
    title: "",
    description: "",
    types: [],
    uploaded: false,
  };
  return (
    <>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={q.title}
          onChange={(e) => updateQueue(index, { title: e.target.value })}
          placeholder="Document title"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          value={q.description}
          onChange={(e) => updateQueue(index, { description: e.target.value })}
          placeholder="Short description"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
        />
      </div>

      {/* Original file name (if chosen) */}
      {q.file.name && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-700">File:</span>{" "}
          {q.file.name}
        </p>
      )}

      {/* File type check‑boxes */}
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">
          File type
        </p>
        <div className="flex flex-col space-y-1">
          {["pdf", "video", "audio"].map((type) => (
            <label key={type} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                value={type}
                checked={q.types.includes(type)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  updateQueue(index, {
                    types: checked
                      ? [...q.types, type]
                      : q.types.filter((t) => t !== type),
                  });
                }}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
