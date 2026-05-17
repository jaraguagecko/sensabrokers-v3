import type { Metadata } from "next";
import InfonavitCalculadora from "@/components/infonavit/InfonavitCalculadora";

export const metadata: Metadata = {
  title: "Calculadora INFONAVIT — ¿Cuánto crédito me dan?",
  description:
    "Ingresa tu salario, antigüedad y datos básicos para calcular cuántos puntos T100 tienes y cuánto crédito INFONAVIT puedes obtener. Gratis, sin registro.",
};

export default function CalculadoraPage() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="badge-gold inline-block mb-3">Modelo T100 · 2026</span>
          <h1 className="text-3xl md:text-4xl font-bold">Calculadora INFONAVIT</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Estimación basada en el sistema de puntos vigente. Resultado en menos de 1 minuto.
          </p>
        </div>
        <InfonavitCalculadora />
      </div>
    </section>
  );
}
