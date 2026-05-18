import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Sensabrokers",
    default: "Sensabrokers — Tu broker hipotecario en Yucatán",
  },
  description:
    "Sensabrokers conecta tu perfil con las mejores opciones hipotecarias, INFONAVIT y créditos bancarios en Yucatán. Comisión transparente al cierre.",
  keywords: ["hipoteca", "crédito hipotecario", "INFONAVIT", "Yucatán", "broker hipotecario", "Mérida"],
  authors: [{ name: "Sensabrokers" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Sensabrokers",
    title: "Sensabrokers — Tu broker hipotecario en Yucatán",
    description:
      "Encuentra la mejor hipoteca para tu perfil. Ingresos formales, informales, mixtos. Sin costo hasta el cierre.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sensabrokers — Tu hipoteca, explicada en claro.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sensabrokers — Tu broker hipotecario en Yucatán",
    description:
      "Encuentra la mejor hipoteca para tu perfil. Ingresos formales, informales, mixtos. Sin costo hasta el cierre.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://sensabrokers.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sensabrokers",
              url: "https://sensabrokers.com",
              description: "Broker hipotecario independiente en Yucatán, México.",
              areaServed: { "@type": "State", name: "Yucatán", containedInPlace: { "@type": "Country", name: "México" } },
              knowsAbout: ["Crédito hipotecario", "INFONAVIT", "Refinanciamiento", "HIR Casa"],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
