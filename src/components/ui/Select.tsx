import type { SelectHTMLAttributes } from "react";
import { inputClasses } from "./Input";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className, children, ...rest }: SelectProps) {
  return (
    <select className={[inputClasses, "appearance-none", className ?? ""].filter(Boolean).join(" ")} {...rest}>
      {children}
    </select>
  );
}
