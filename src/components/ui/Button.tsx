import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md text-center " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)] " +
  "active:translate-y-0 active:scale-[0.98] " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none disabled:active:scale-100 " +
  "motion-reduce:transform-none motion-reduce:hover:transform-none motion-reduce:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--brand-gold),var(--brand-gold-light))] text-[var(--text-onbrand)] font-bold border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.25)] " +
    "hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)] hover:brightness-[1.03]",
  secondary:
    "bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-onbrand)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--surface-2)] hover:border-[var(--border-focus)] hover:-translate-y-0.5",
  link:
    "bg-transparent text-[var(--accent)] border border-transparent underline-offset-4 hover:underline hover:text-[var(--accent-hover)] px-0 py-0 rounded-none active:scale-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

export type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, extra?: string) {
  const sizeClass = variant === "link" ? "" : sizes[size];
  return [base, variants[variant], sizeClass, fullWidth ? "w-full" : "", extra ?? ""]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const fullWidth = props.fullWidth ?? false;
  const cls = classes(variant, size, fullWidth, props.className);

  if (props.href !== undefined) {
    const { href, external, children, ...rest } = props as ButtonAsLink;
    // strip our custom props before spreading
    delete (rest as Record<string, unknown>).variant;
    delete (rest as Record<string, unknown>).size;
    delete (rest as Record<string, unknown>).fullWidth;
    delete (rest as Record<string, unknown>).className;

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, type, ...rest } = props as ButtonAsButton;
  delete (rest as Record<string, unknown>).variant;
  delete (rest as Record<string, unknown>).size;
  delete (rest as Record<string, unknown>).fullWidth;
  delete (rest as Record<string, unknown>).className;
  return (
    <button type={type ?? "button"} className={cls} {...rest}>
      {children}
    </button>
  );
}
