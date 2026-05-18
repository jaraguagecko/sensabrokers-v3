import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "gold" | "neutral";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  gold:
    "bg-[rgba(201,162,39,0.15)] text-[var(--accent)] border border-[rgba(201,162,39,0.3)]",
  neutral:
    "bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border-subtle)]",
};

const sizes: Record<BadgeSize, string> = {
  sm: "text-[0.6rem] px-2 py-0.5",
  md: "text-xs px-3 py-1",
};

export default function Badge({
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: BadgeProps) {
  const cls = [
    "inline-flex items-center rounded-[var(--radius-pill)] font-semibold uppercase tracking-[var(--tracking-wide)]",
    variants[variant],
    sizes[size],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
