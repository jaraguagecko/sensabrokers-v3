import type { Metadata } from "next";
import MatcherForm from "@/components/matcher/MatcherForm";

export const metadata: Metadata = {
  title: "Matcher hipotecario — Encuentra tu hipoteca ideal",
  description:
    "Responde 5 preguntas y descubre qué hipotecas aplican para tu perfil. Gratis, sin registro. Resultados en 2 minutos.",
};

export default function MatcherPage() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="badge-gold inline-block mb-3">Matcher MVP · 2 minutos</span>
          <h1 className="text-3xl md:text-4xl font-bold">Tu hipoteca ideal</h1>
          <p className="text-gray-400 mt-3 text-sm">
            Sin registro · Sin costo · Sin compromiso
          </p>
        </div>
        <MatcherForm />
      </div>
    </section>
  );
}
