import Image from "next/image";
import Card from "../ui/Card";
import Button from "../ui/Button";

export interface AdvisorCardProps {
  name?: string;
  role?: string;
  city?: string;
  message?: string;
  whatsappHref?: string;
  calendlyHref?: string;
  isMockup?: boolean;
}

export default function AdvisorCard({
  name = "Daniela Pech",
  role = "Asesora hipotecaria",
  city = "Mérida, Yucatán",
  message = "Te acompaño desde la primera duda hasta las llaves. Te escribo por WhatsApp con tu nombre — sin formularios eternos, sin bots.",
  whatsappHref = "https://wa.me/529999999999",
  calendlyHref = "https://calendly.com/sensabrokers/consulta",
  isMockup = true,
}: AdvisorCardProps) {
  return (
    <Card padding="lg" className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-left">
      <div className="relative shrink-0">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-[var(--surface-2)] shadow-[var(--shadow-md)]">
          <Image
            src="/brand/advisor-illustration.svg"
            alt={`Ilustración de ${name}, asesora Sensabrokers`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        {isMockup && (
          <span
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[var(--tracking-wide)] px-2 py-0.5 rounded-pill bg-[var(--surface-3)] text-[var(--text-subtle)]"
            title="Asset placeholder — sustituir con foto real"
          >
            Mockup
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl text-[var(--text-primary)]">{name}</h3>
          <span className="text-xs uppercase tracking-[var(--tracking-wide)] text-[var(--accent)]">
            · asesor humano
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          {role} · {city}
        </p>
        <p className="mt-4 text-[var(--text-primary)] leading-relaxed italic font-display">
          &ldquo;{message}&rdquo;
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href={whatsappHref} external variant="primary" size="sm">
            Escríbeme por WhatsApp
          </Button>
          <Button href={calendlyHref} external variant="secondary" size="sm">
            Agendar una llamada
          </Button>
        </div>
      </div>
    </Card>
  );
}
