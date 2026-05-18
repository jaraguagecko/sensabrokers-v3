"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";

const navLinks = [
  { href: "/hipotecas", label: "Hipotecas" },
  { href: "/infonavit", label: "INFONAVIT" },
  { href: "/#nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-surface-0/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center" aria-label="Sensabrokers — Inicio">
          <Image
            src="/brand/logo-light.svg"
            alt="Sensabrokers"
            width={180}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav
          aria-label="Principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link relative hover:text-text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Button
            href="https://calendly.com/sensabrokers/consulta"
            external
            variant="secondary"
            size="sm"
          >
            Agenda consulta
          </Button>
        </div>

        <button
          className="md:hidden text-text-muted hover:text-text-primary transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border-subtle bg-surface-0 px-6 py-6 flex flex-col gap-4"
        >
          <nav aria-label="Principal móvil" className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-primary hover:text-accent transition-colors text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Button
            href="https://calendly.com/sensabrokers/consulta"
            external
            variant="secondary"
            size="sm"
            fullWidth
          >
            Agenda consulta
          </Button>
        </div>
      )}
    </header>
  );
}
