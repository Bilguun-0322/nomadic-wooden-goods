"use client";

import React from "react";
import { CATEGORIES } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  counts?: Record<string, number>;
}

export function CategoryFilter({
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-1">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 min-w-0 pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === (cat.id === "all" ? "" : cat.id);
          const count = counts
            ? cat.id === "all"
              ? counts.all
              : counts[cat.id]
            : undefined;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id === "all" ? "" : cat.id)}
              className={cn(
                "tap-target flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap border select-none inline-flex items-center justify-center shadow-sm",
                isActive
                  ? "bg-brand-dark text-white border-brand-dark ring-2 ring-brand-gold/40 shadow"
                  : "bg-brand-bg text-brand-dark/90 border-brand-border hover:border-brand-gold hover:text-brand-dark active:bg-brand-border/40"
              )}
            >
              <span>{cat.name}</span>
              {count !== undefined && (
                <span
                  className={cn(
                    "ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold leading-none",
                    isActive
                      ? "bg-brand-gold text-white"
                      : "bg-brand-border/70 text-brand-muted"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
