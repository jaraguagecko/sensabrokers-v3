import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sensabrokers — Próximamente",
  description:
    "Estamos preparando una nueva experiencia para ayudarte a encontrar tu hipoteca ideal en Yucatán.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Sensabrokers",
    title: "Sensabrokers — Próximamente",
    description:
      "Estamos preparando una nueva experiencia para ayudarte a encontrar tu hipoteca ideal en Yucatán.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sensabrokers — Próximamente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sensabrokers — Próximamente",
    description:
      "Estamos preparando una nueva experiencia para ayudarte a encontrar tu hipoteca ideal en Yucatán.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://sensabrokers.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" data-theme="warm">
      <body className={`${geistSans.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
