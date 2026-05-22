import Card from "../ui/Card";

export interface TestimonialProps {
  quote: string;
  name: string;
  detail: string;
  isMockup?: boolean;
}

export default function Testimonial({ quote, name, detail, isMockup = true }: TestimonialProps) {
  return (
    <Card padding="lg" className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute -top-3 left-6 w-10 h-10 text-[var(--accent)] opacity-40"
        fill="currentColor"
      >
        <path d="M7.17 6C4.87 6 3 7.87 3 10.17v3.66C3 15.87 4.87 17.74 7.17 17.74h.66c.18 1.79-.51 3.28-2.07 4.46l1.16 1.13C9.66 21.7 11 19.04 11 15.83v-5.66C11 7.87 9.13 6 6.83 6h.34Zm10 0c-2.3 0-4.17 1.87-4.17 4.17v3.66c0 2.3 1.87 4.17 4.17 4.17h.66c.18 1.79-.51 3.28-2.07 4.46l1.16 1.13c2.74-1.63 4.08-4.29 4.08-7.5v-5.92C21 7.87 19.13 6 16.83 6h.34Z" />
      </svg>
      <blockquote className="font-display text-lg md:text-xl text-[var(--text-primary)] leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 text-sm">
        <div className="w-10 h-10 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-[var(--text-primary)] font-display font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-[var(--text-primary)]">{name}</div>
          <div className="text-[var(--text-subtle)] text-xs">{detail}</div>
        </div>
        {isMockup && (
          <span
            className="ml-auto text-[10px] uppercase tracking-[var(--tracking-wide)] px-2 py-0.5 rounded-pill bg-[var(--surface-3)] text-[var(--text-subtle)]"
            title="Testimonio de ejemplo — sustituir con material real"
          >
            Mockup
          </span>
        )}
      </footer>
    </Card>
  );
}
