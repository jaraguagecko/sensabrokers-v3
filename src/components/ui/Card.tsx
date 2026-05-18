import type { HTMLAttributes, ReactNode } from "react";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  padding?: CardPadding;
  bordered?: boolean;
  interactive?: boolean;
  children: ReactNode;
}

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6 md:p-8",
};

const INTERACTIVE =
  "transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] " +
  "hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] " +
  "motion-reduce:transform-none motion-reduce:hover:transform-none";

export default function Card({
  padding = "md",
  bordered = true,
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  const cls = [
    "bg-[var(--surface-1)] rounded-[var(--radius-lg)]",
    bordered ? "border border-[var(--border-subtle)]" : "",
    interactive ? INTERACTIVE : "",
    paddings[padding],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
