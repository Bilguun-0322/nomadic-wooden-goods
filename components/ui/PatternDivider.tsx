import React from "react";

interface PatternDividerProps {
  className?: string;
  variant?: "gold" | "red" | "subtle";
}

export function PatternDivider({
  className = "",
  variant = "gold",
}: PatternDividerProps) {
  const strokeColor =
    variant === "red" ? "#8F3324" : variant === "gold" ? "#C79A4B" : "#D4C7B8";

  return (
    <div
      className={`w-full flex items-center justify-center my-6 sm:my-8 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-border to-transparent max-w-xs" />
      <div className="mx-4 flex items-center gap-2 text-brand-gold">
        {/* Mongolian Traditional Ulzii / Fret Knot SVG */}
        <svg
          width="36"
          height="16"
          viewBox="0 0 72 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          <path
            d="M8 16 H64 M20 8 H52 M20 24 H52 M14 8 V24 M58 8 V24 M36 4 V28"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36" cy="16" r="3" fill={strokeColor} />
          <circle cx="8" cy="16" r="2" fill={strokeColor} />
          <circle cx="64" cy="16" r="2" fill={strokeColor} />
        </svg>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-border to-transparent max-w-xs" />
    </div>
  );
}
