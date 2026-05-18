import type { TextareaHTMLAttributes } from "react";
import { inputClasses } from "./Input";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={[inputClasses, "min-h-24 resize-y", className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
