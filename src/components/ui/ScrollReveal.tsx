"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  as,
  className,
  delay = 0,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      node.setAttribute("data-revealed", "true");
      return;
    }

    if (delay) node.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.setAttribute("data-revealed", "true");
            if (once) observer.unobserve(node);
          } else if (!once) {
            node.setAttribute("data-revealed", "false");
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  const cls = ["reveal", className ?? ""].filter(Boolean).join(" ");
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={cls}
      data-revealed="false"
    >
      {children}
    </Tag>
  );
}
