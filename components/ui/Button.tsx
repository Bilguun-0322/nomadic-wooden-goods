import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "messenger"
    | "phone"
    | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none tap-target";

    const sizeStyles = {
      sm: "px-4 py-2 text-sm min-h-[44px]",
      md: "px-5 py-2.5 text-base min-h-[48px]",
      lg: "px-7 py-3.5 text-lg min-h-[52px] font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-brand-gold text-white hover:bg-brand-goldHover focus-visible:ring-brand-gold shadow-sm active:scale-[0.98]",
      secondary:
        "bg-brand-dark text-white hover:bg-brand-woodDark focus-visible:ring-brand-dark active:scale-[0.98]",
      outline:
        "border-2 border-brand-border text-brand-dark hover:border-brand-gold hover:text-brand-gold bg-transparent focus-visible:ring-brand-gold",
      ghost:
        "text-brand-dark hover:bg-brand-border/40 focus-visible:ring-brand-dark",
      messenger:
        "bg-[#0084FF] text-white hover:bg-[#0074E0] focus-visible:ring-[#0084FF] shadow-sm active:scale-[0.98]",
      phone:
        "bg-[var(--brand-green)] text-white hover:bg-[var(--brand-greenHover)] focus-visible:ring-[var(--brand-green)] shadow-lg active:scale-[0.98]",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      fullWidth ? "w-full" : "",
      className
    );

    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className="mr-2 flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="ml-2 flex-shrink-0">{icon}</span>
        )}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
