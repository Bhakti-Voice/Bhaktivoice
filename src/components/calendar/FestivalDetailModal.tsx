"use client";

import React, { useEffect } from "react";
import type { FestivalDetail } from "@/lib/panchang/types";
import { FestivalDetailView } from "./FestivalDetailView";

export type FestivalDetailModalProps = {
  festival: FestivalDetail | null;
  isOpen: boolean;
  onClose: () => void;
};

export function FestivalDetailModal({ festival, isOpen, onClose }: FestivalDetailModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !festival) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Dialog Body */}
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-ivory p-4 shadow-2xl border border-line sm:p-6">
        <FestivalDetailView festival={festival} isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
