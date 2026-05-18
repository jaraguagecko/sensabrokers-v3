import type { HTMLAttributes, ReactNode } from "react";

export type ContainerWidth = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  width?: ContainerWidth;
  children: ReactNode;
}

const widths: Record<ContainerWidth, string> = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-none",
};

export default function Container({ width = "xl", className, children, ...rest }: ContainerProps) {
  return (
    <div className={["mx-auto px-6", widths[width], className ?? ""].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
