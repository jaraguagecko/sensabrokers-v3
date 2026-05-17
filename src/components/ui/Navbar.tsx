"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span style={{ color: "var(--color-brand-gold)" }}>Sensa</span>
            <span className="text-white">brokers</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/hipotecas" className="hover:text-white transition-colors">Hipotecas</Link>
          <Link href="/infonavit" className="hover:text-white transition-colors">INFONAVIT</Link>
          <Link href="#nosotros" className="hover:text-white transition-colors">Nosotros</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://calendly.com/sensabrokers/consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm px-5 py-2.5"
          >
            Agenda consulta
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
          <Link href="/hipotecas" className="text-gray-300 hover:text-white" onClick={() => setOpen(false)}>Hipotecas</Link>
          <Link href="/infonavit" className="text-gray-300 hover:text-white" onClick={() => setOpen(false)}>INFONAVIT</Link>
          <Link href="#nosotros" className="text-gray-300 hover:text-white" onClick={() => setOpen(false)}>Nosotros</Link>
          <a href="https://calendly.com/sensabrokers/consulta" className="btn-gold text-center text-sm" target="_blank" rel="noopener noreferrer">
            Agenda consulta
          </a>
        </div>
      )}
    </header>
  );
}
