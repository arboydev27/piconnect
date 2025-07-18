// One file uplaod view:
// import { UploadCloud, X, FileText, CheckCircle2 } from "lucide-react"; // 👈 handy “upload” glyph
// import { useState, useRef, useCallback } from "react";

// export default function Dropzone({
//   onFilesSelected,
//   onClose,
// }: {
//   onFilesSelected?: (f: FileList) => void;
//   onClose?: () => void;
// }) {
//   const [isHovering, setIsHovering] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [fileType, setFileType] = useState<string[]>([]);
//   const [fileName, setFileName] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFiles = useCallback(
//     (files: FileList | null) => {
//       if (files?.length) onFilesSelected?.(files);
//       if (files && files.length > 0) setFileName(files[0].name);
//     },
//     [onFilesSelected]
//   );

//   return (
//     <div className="flex items-center justify-center w-screen px-4">
//       <div className="relative w-full max-w-md p-8 border rounded-lg bg-white shadow-lg">
//         <div className="w-full max-w-md">
//           <div className="space-y-4 mb-4">
//             {onClose && (
//               <button
//                 onClick={onClose}
//                 className="absolute top-2 right-2 rounded-full bg-[#0f172a] p-1 text-white hover:bg-red-400"
//                 aria-label="Close"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Document title"
//                 className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <input
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Short description"
//                 className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400"
//               />
//             </div>

//             {/* Original file name (if chosen) */}
//             {fileName && (
//               <p className="text-sm text-gray-600">
//                 <span className="font-semibold text-gray-700">File:</span>{" "}
//                 {fileName}
//               </p>
//             )}

//             {/* File type check‑boxes */}
//             <div>
//               <p className="block text-sm font-medium text-gray-700 mb-2">
//                 File type
//               </p>
//               <div className="flex flex-col space-y-1">
//                 {["pdf", "video", "audio"].map((type) => (
//                   <label key={type} className="inline-flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value={type}
//                       checked={fileType.includes(type)}
//                       onChange={(e) => {
//                         const checked = e.target.checked;
//                         setFileType((prev) =>
//                           checked
//                             ? [...prev, type]
//                             : prev.filter((t) => t !== type)
//                         );
//                       }}
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span className="text-sm text-gray-700 capitalize">
//                       {type}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <label
//             htmlFor="dropzone-file"
//             className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed shadow-sm rounded-lg cursor-pointer
//                     ${isHovering ? "dark:bg-[#E2E8F0]" : "bg-white"}
//                     border-gray-300 hover:bg-[#E2E8F0]`}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsHovering(true);
//             }}
//             onDragLeave={() => setIsHovering(false)}
//             onDrop={(e) => {
//               e.preventDefault();
//               setIsHovering(false);
//               handleFiles(e.dataTransfer.files);
//             }}
//           >
//             {uploadSuccess ? (
//               /* ✅ Success state */
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <CheckCircle2 className="w-10 h-10 mb-2 text-green-500" />
//                 <p className="text-sm font-medium text-green-600">
//                   Successfully added!
//                 </p>
//               </div>
//             ) : fileName ? (
//               /* 📄 File‑selected state */
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <FileText className="w-8 h-8 mb-2 text-gray-500" />
//                 <p className="text-sm text-gray-700 text-center break-all px-2">
//                   {fileName}
//                 </p>
//               </div>
//             ) : (
//               /* ☁️ Default prompt */
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   <span className="font-semibold">Click to upload</span> or drag
//                   and drop
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   SVG, PNG, JPG or GIF (MAX. 800×400 px)
//                 </p>
//               </div>
//             )}

//             <input
//               id="dropzone-file"
//               ref={inputRef}
//               type="file"
//               multiple
//               className="hidden"
//               onChange={(e) => handleFiles(e.target.files)}
//             />
//           </label>
//           <button
//             type="button"
//             onClick={() => {
//               setUploadSuccess(true);
//             }}
//             disabled={uploadSuccess || !fileName}
//             className={`mt-4 w-full rounded-lg px-4 py-2 text-white ${
//               uploadSuccess || !fileName
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {uploadSuccess ? "Uploaded" : "Upload"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Multiple file upload view:
// "use client";
// import { UploadCloud, X, FileText, CheckCircle2 } from "lucide-react";
// import { useState, useRef, useCallback } from "react";

// /* ────────────────────────────────────────────────────
//    Types
//    ──────────────────────────────────────────────────── */
// interface QueuedFile {
//   file: File; // original File object
//   title: string;
//   description: string;
//   types: string[]; // ['pdf','video',…]
//   uploaded: boolean; // success flag
// }

// /* ────────────────────────────────────────────────────
//    Component
//    ──────────────────────────────────────────────────── */
// export default function Dropzone({
//   onFilesSelected,
//   onClose,
// }: {
//   onFilesSelected?: (f: FileList) => void;
//   onClose?: () => void;
// }) {
//   /* ─ State ─ */
//   const [queue, setQueue] = useState<QueuedFile[]>([]);
//   const [isHovering, setIsHovering] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   /* ─ Helpers ─ */
//   const appendFiles = useCallback(
//     (fileList: FileList | null) => {
//       if (!fileList) return;

//       const incoming: QueuedFile[] = Array.from(fileList).map((f) => ({
//         file: f,
//         title: "",
//         description: "",
//         types: [],
//         uploaded: false,
//       }));

//       onFilesSelected?.(fileList);
//       setQueue((prev) => [...prev, ...incoming]);
//     },
//     [onFilesSelected]
//   );

//   const updateQueue = (index: number, updates: Partial<QueuedFile>) =>
//     setQueue((prev) =>
//       prev.map((q, i) => (i === index ? { ...q, ...updates } : q))
//     );

//   /* ─ Upload all (fake) ─ */
//   const uploadAll = () => {
//     setQueue((prev) =>
//       prev.map((q) => ({
//         ...q,
//         uploaded: true,
//       }))
//     );
//   };

//   /* ─ View ─ */

//   return (
//     <div className="flex items-center justify-center w-screen px-4">
//       {/* Card */}
//       <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
//         {/* Close */}
//         {onClose && (
//           <button
//             onClick={onClose}
//             className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-red-500"
//             aria-label="Close"
//             type="button"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )}

//         {/* Dropzone */}
//         <label
//           htmlFor="dropzone-file"
//           className={`relative flex flex-col items-center justify-center w-full h-44 mb-6 border-2 border-dashed rounded-lg cursor-pointer
//             ${
//               isHovering ? "bg-gray-100" : "bg-white"
//             } border-gray-300 hover:bg-gray-50`}
//           onDragOver={(e) => {
//             e.preventDefault();
//             setIsHovering(true);
//           }}
//           onDragLeave={() => setIsHovering(false)}
//           onDrop={(e) => {
//             e.preventDefault();
//             setIsHovering(false);
//             appendFiles(e.dataTransfer.files);
//           }}
//         >
//           <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
//           <p className="text-sm text-gray-600 text-center px-2">
//             <span className="font-semibold">Click to upload</span> or drag and
//             drop files
//           </p>
//           <p className="text-xs text-gray-500">PDF, video, audio — any size</p>

//           <input
//             id="dropzone-file"
//             ref={inputRef}
//             type="file"
//             multiple
//             className="hidden"
//             onChange={(e) => appendFiles(e.target.files)}
//           />
//         </label>

//         {/* Queue list */}
//         {queue.length === 0 ? (
//           <p className="text-center text-sm text-gray-500">
//             No files queued yet.
//           </p>
//         ) : (
//           <div className="max-h-72 overflow-y-auto space-y-4 mb-4">
//             {queue.map((q, idx) => (
//               <div
//                 key={q.file.name + idx}
//                 className="border rounded p-4 space-y-3"
//               >
//                 {/* filename */}
//                 <div className="flex items-center gap-2">
//                   {q.uploaded ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <FileText className="w-5 h-5 text-gray-500" />
//                   )}
//                   <span className="break-all text-sm text-gray-700">
//                     {q.file.name}
//                   </span>
//                 </div>

//                 {/* title */}
//                 <input
//                   className="w-full border rounded px-2 py-1 text-sm placeholder-gray-400"
//                   placeholder="Title"
//                   value={q.title}
//                   onChange={(e) => updateQueue(idx, { title: e.target.value })}
//                 />

//                 {/* description */}
//                 <input
//                   className="w-full border rounded px-2 py-1 text-sm placeholder-gray-400"
//                   placeholder="Description"
//                   value={q.description}
//                   onChange={(e) =>
//                     updateQueue(idx, { description: e.target.value })
//                   }
//                 />

//                 {/* file type checkboxes */}
//                 <div className="flex gap-6">
//                   {["pdf", "video", "audio"].map((t) => (
//                     <label
//                       key={t}
//                       className="inline-flex items-center gap-1 text-xs capitalize text-gray-700"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={q.types.includes(t)}
//                         onChange={(e) => {
//                           const checked = e.target.checked;
//                           updateQueue(idx, {
//                             types: checked
//                               ? [...q.types, t]
//                               : q.types.filter((x) => x !== t),
//                           });
//                         }}
//                       />
//                       {t}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Upload all */}
//         <button
//           onClick={uploadAll}
//           disabled={queue.length === 0}
//           className={`w-full rounded-lg py-2 text-white ${
//             queue.length === 0
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           type="button"
//         >
//           {queue.every((q) => q.uploaded) ? "All Uploaded" : "Upload All"}
//         </button>
//       </div>
//     </div>
//   );
// }
