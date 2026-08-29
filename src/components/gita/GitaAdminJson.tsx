"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { validateGitaJson } from "@/lib/gita/validator";
import { GitaValidationSummary } from "@/lib/gita/types";

interface GitaAdminJsonProps {
  onImportSuccess?: () => void;
}

export function GitaAdminJson({ onImportSuccess }: GitaAdminJsonProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jsonText, setJsonText] = useState<string>("");
  const [validation, setValidation] = useState<GitaValidationSummary | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [selectedChapterPreview, setSelectedChapterPreview] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processJsonString = (content: string, fileName?: string) => {
    setJsonText(content);
    setImportResult(null);
    try {
      const summary = validateGitaJson(content);
      setValidation(summary);
    } catch (e: any) {
      setValidation({
        isValid: false,
        totalChapters: 0,
        totalVerses: 0,
        totalWords: 0,
        languages: [],
        errors: [{ code: "INVALID_JSON", message: e?.message || "Invalid JSON format" }],
        warnings: [],
        sampleChapters: [],
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".json")) {
      alert("Please upload a .json file.");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processJsonString(text, selectedFile.name);
    };
    reader.readAsText(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (!droppedFile.name.endsWith(".json")) {
      alert("Please upload a .json file.");
      return;
    }

    setFile(droppedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processJsonString(text, droppedFile.name);
    };
    reader.readAsText(droppedFile);
  };

  const handleImportToServer = async () => {
    if (!validation || !validation.isValid || !jsonText) return;

    setImporting(true);
    setImportResult(null);

    try {
      const parsedData = JSON.parse(jsonText);
      const res = await fetch("/api/gita/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedData, mode: "merge" }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setImportResult({
          success: true,
          message: data.result?.message || "Gita scripture data successfully imported into the system!",
        });
        onImportSuccess?.();
      } else {
        setImportResult({
          success: false,
          message: data.error || (data.errors ? data.errors[0]?.message : "Failed to import JSON data."),
        });
      }
    } catch (error: any) {
      setImportResult({
        success: false,
        message: error?.message || "An unexpected error occurred during upload.",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadSample = async () => {
    try {
      const res = await fetch("/api/gita/admin/sample");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bhagavad_gita_sample_template.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      alert("Could not download sample template.");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
              <FileCode className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              Import / Update Bhagavad Gita (JSON)
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            Upload validated JSON files to bulk import or update chapters, shlokas, and commentaries.
          </p>
        </div>

        <button
          onClick={handleDownloadSample}
          className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Download Sample JSON</span>
        </button>
      </div>

      {/* Main 3-Column Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Upload JSON File */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Upload JSON File
          </h3>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative flex min-h-[220px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? "border-amber-500 bg-amber-50/50"
                : "border-stone-300 bg-stone-50/50 hover:bg-stone-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <UploadCloud className="h-6 w-6" />
            </div>

            <p className="text-xs font-medium text-stone-700">
              Drag and drop JSON file here
            </p>
            <p className="my-1 text-[11px] text-stone-400">or</p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-amber-900 border border-stone-300 shadow-2xs hover:bg-stone-100 transition-colors"
            >
              Choose File
            </button>

            {file && (
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-200">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="max-w-[160px] truncate">{file.name}</span>
              </div>
            )}

            <p className="mt-3 text-[10px] text-stone-400">Max file size: 10MB</p>
          </div>
        </div>

        {/* Column 2: JSON Preview & Statistics */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            JSON Preview
          </h3>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="rounded-xl bg-purple-50 p-2.5 text-center border border-purple-100">
              <p className="text-[10px] font-medium text-purple-700 uppercase">Chapters</p>
              <p className="text-base font-bold text-purple-950">
                {validation ? validation.totalChapters : "--"}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-2.5 text-center border border-emerald-100">
              <p className="text-[10px] font-medium text-emerald-700 uppercase">Verses</p>
              <p className="text-base font-bold text-emerald-950">
                {validation ? validation.totalVerses : "--"}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-2.5 text-center border border-blue-100">
              <p className="text-[10px] font-medium text-blue-700 uppercase">Total Words</p>
              <p className="text-base font-bold text-blue-950">
                {validation ? validation.totalWords.toLocaleString() : "--"}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-2.5 text-center border border-amber-100">
              <p className="text-[10px] font-medium text-amber-700 uppercase">Language</p>
              <p className="text-xs font-bold text-amber-950 truncate" title={validation?.languages.join(", ")}>
                {validation?.languages.length ? validation.languages.join(", ") : "--"}
              </p>
            </div>
          </div>

          {/* Preview Tree Card */}
          <div className="flex-1 rounded-xl bg-stone-50 p-3.5 border border-stone-200 max-h-56 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
              <span className="text-xs font-semibold text-stone-800">
                Preview ({validation ? `${validation.sampleChapters.length} Chapters` : "No File Loaded"})
              </span>
            </div>

            {validation && validation.sampleChapters.length > 0 ? (
              <div className="space-y-2">
                {validation.sampleChapters
                  .slice(0, previewExpanded ? undefined : 2)
                  .map((ch, idx) => (
                    <div
                      key={ch.chapter}
                      className="rounded-lg bg-white p-2.5 border border-stone-200 text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold text-stone-900">
                        <span>
                          Chapter {ch.chapter} - {ch.name} ({ch.nameHindi})
                        </span>
                        <span className="text-[10px] text-stone-500 font-normal">
                          {ch.verses?.length || 0} verses
                        </span>
                      </div>

                      {ch.verses && ch.verses.length > 0 && (
                        <div className="mt-2 space-y-1 pl-2 border-l-2 border-amber-200">
                          {ch.verses.slice(0, 2).map((v) => (
                            <div key={v.verse} className="text-[11px] text-stone-600">
                              <span className="font-semibold text-amber-950">
                                Verse {v.verse}:
                              </span>{" "}
                              <span className="font-devanagari text-stone-800">
                                {v.sanskrit.slice(0, 45)}...
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                {validation.sampleChapters.length > 2 && (
                  <button
                    onClick={() => setPreviewExpanded(!previewExpanded)}
                    className="w-full text-center text-xs font-semibold text-amber-700 hover:text-amber-800 pt-1"
                  >
                    {previewExpanded ? "Show Less" : "View More"}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-center py-6 text-xs text-stone-400">
                Upload a valid JSON file to inspect chapters and verses preview.
              </p>
            )}
          </div>
        </div>

        {/* Column 3: Validation Checklist & Import Actions */}
        <div className="flex flex-col justify-between gap-3">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Validation
            </h3>

            {/* Checklist items */}
            <div className="space-y-2 rounded-xl bg-stone-50 p-3.5 border border-stone-200">
              <div className="flex items-center gap-2 text-xs">
                {validation?.errors.some((e) => e.code === "INVALID_JSON") ? (
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                ) : validation ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-stone-300 shrink-0" />
                )}
                <span className={validation?.isValid ? "text-stone-800" : "text-stone-500"}>
                  JSON format is valid
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {validation?.errors.some(
                  (e) => e.code === "MISSING_CHAPTERS" || e.code === "MISSING_NAME",
                ) ? (
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                ) : validation ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-stone-300 shrink-0" />
                )}
                <span className={validation?.isValid ? "text-stone-800" : "text-stone-500"}>
                  All required fields are present
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {validation?.errors.some(
                  (e) => e.code === "DUPLICATE_CHAPTER" || e.code === "DUPLICATE_VERSE",
                ) ? (
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                ) : validation ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-stone-300 shrink-0" />
                )}
                <span className={validation?.isValid ? "text-stone-800" : "text-stone-500"}>
                  No duplicate chapter/verse found
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {validation?.errors.some((e) => e.code === "MISSING_SANSKRIT") ? (
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                ) : validation ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-stone-300 shrink-0" />
                )}
                <span className={validation?.isValid ? "text-stone-800" : "text-stone-500"}>
                  Sanskrit verse format looks good
                </span>
              </div>
            </div>

            {/* Validation Result Banner */}
            {validation && validation.isValid && (
              <div className="rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-900 border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Validation Successful</span>
                </div>
                <p className="mt-0.5 text-emerald-700">
                  Your JSON file is ready to import ({validation.totalChapters} chapters, {validation.totalVerses} verses).
                </p>
              </div>
            )}

            {validation && !validation.isValid && (
              <div className="rounded-xl bg-red-50 p-3.5 text-xs text-red-900 border border-red-200">
                <div className="flex items-center gap-1.5 font-bold text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Validation Failed</span>
                </div>
                <div className="mt-1 max-h-24 overflow-y-auto space-y-1 text-[11px] text-red-700">
                  {validation.errors.map((err, i) => (
                    <p key={i}>• {err.message}</p>
                  ))}
                </div>
              </div>
            )}

            {importResult && (
              <div
                className={`rounded-xl p-3.5 text-xs border ${
                  importResult.success
                    ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                    : "bg-red-50 text-red-900 border-red-200"
                }`}
              >
                <p className="font-semibold">{importResult.message}</p>
              </div>
            )}
          </div>

          {/* Import Primary Action Button */}
          <button
            onClick={handleImportToServer}
            disabled={!validation || !validation.isValid || importing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5a3da0] to-[#432386] px-5 py-3 text-sm font-semibold text-white shadow-md hover:from-[#4f3292] hover:to-[#381c73] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            {importing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Importing to Server...</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                <span>Import to Server</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
