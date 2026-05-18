import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const inputClasses =
  "w-full bg-[var(--surface-2)] text-[var(--text-primary)] border border-[var(--border-strong)] " +
  "rounded-[var(--radius-md)] px-4 py-3 text-base placeholder:text-[var(--text-subtle)] " +
  "transition-colors duration-200 ease-out " +
  "focus:outline-none focus:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)] " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

export default function Input({ className, ...rest }: InputProps) {
  return <input className={[inputClasses, className ?? ""].filter(Boolean).join(" ")} {...rest} />;
}

export { inputClasses };
