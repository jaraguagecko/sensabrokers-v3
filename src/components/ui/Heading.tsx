import type { HTMLAttributes, ReactNode } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
}

const sizes: Record<HeadingSize, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
  "2xl": "text-3xl md:text-4xl",
  "3xl": "text-4xl md:text-5xl",
  "4xl": "text-4xl md:text-6xl",
};

const defaultSize: Record<HeadingLevel, HeadingSize> = {
  1: "4xl",
  2: "xl",
  3: "md",
  4: "sm",
  5: "xs",
  6: "xs",
};

export default function Heading({
  as = 2,
  size,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${as}` as const;
  const cls = [
    "font-bold leading-[var(--leading-tight)] text-[var(--text-primary)] sb-heading",
    sizes[size ?? defaultSize[as]],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
