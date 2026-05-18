import type { HTMLAttributes, ReactNode } from "react";

export type SectionSpacing = "sm" | "md" | "lg" | "xl";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  spacing?: SectionSpacing;
  tone?: "default" | "muted";
  children: ReactNode;
}

const spacings: Record<SectionSpacing, string> = {
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-20",
};

export default function Section({
  spacing = "lg",
  tone = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  const tones = tone === "muted" ? "bg-[#050d1a]" : "";
  return (
    <section className={["px-6", spacings[spacing], tones, className ?? ""].filter(Boolean).join(" ")} {...rest}>
      {children}
    </section>
  );
}
