type TrustItem = {
  icon: "human" | "no-bots" | "whatsapp" | "no-cost";
  label: string;
};

const ICONS: Record<TrustItem["icon"], React.ReactNode> = {
  human: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
    </svg>
  ),
  "no-bots": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M9 12h.01M15 12h.01M12 3v4M8 19v2M16 19v2" strokeLinecap="round" />
      <path d="M3 4l18 16" strokeLinecap="round" stroke="currentColor" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.55 0 .25 5.3.25 11.81c0 2.08.54 4.1 1.57 5.88L0 24l6.5-1.7a11.8 11.8 0 0 0 5.55 1.41h.01c6.5 0 11.8-5.3 11.8-11.8 0-3.15-1.23-6.11-3.34-8.43Zm-8.47 18.12h-.01a9.79 9.79 0 0 1-4.99-1.37l-.36-.21-3.86 1.01 1.03-3.76-.23-.39a9.78 9.78 0 0 1-1.5-5.18c0-5.42 4.42-9.84 9.84-9.84 2.63 0 5.1 1.02 6.96 2.88a9.77 9.77 0 0 1 2.88 6.97c0 5.41-4.42 9.83-9.84 9.83Zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48a9.02 9.02 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5l-.56-.01a1.08 1.08 0 0 0-.78.37c-.27.3-1.02 1-1.02 2.43 0 1.44 1.04 2.83 1.19 3.02.15.2 2.05 3.13 4.97 4.39.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.75-.71 2-1.4.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/>
    </svg>
  ),
  "no-cost": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9.5c0-1.1 1.34-2 3-2s3 .9 3 2-1 1.7-3 2.5-3 1.4-3 2.5 1.34 2 3 2 3-.9 3-2M12 6v1.5M12 16.5V18" strokeLinecap="round" />
    </svg>
  ),
};

const ITEMS: TrustItem[] = [
  { icon: "human", label: "Asesor con cara y nombre" },
  { icon: "no-bots", label: "Sin bots — atención humana" },
  { icon: "whatsapp", label: "WhatsApp directo" },
  { icon: "no-cost", label: "Sin costo hasta el cierre" },
];

export default function TrustStrip() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]">
      {ITEMS.map((it) => (
        <li key={it.label} className="inline-flex items-center gap-2">
          <span className="text-[var(--accent)]" aria-hidden="true">{ICONS[it.icon]}</span>
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}
