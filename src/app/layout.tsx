import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { z } from "zod";

import Header from "@/app/components/header";
import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";

const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
});

const environments = z.enum(["dev_local", "dev", "prd_local", "prd"]);
type Environments = z.infer<typeof environments>;

const baseUrl: Record<Environments, string> = {
  dev_local: "http://localhost:3000",
  dev: "https://pruebas.blancayfernando.com",
  prd_local: "http://localhost:3000",
  prd: "https://blancayfernando.com",
};

export const metadata = {
  title: "Boda de Blanca y Fernando",
  description:
    "Nuestra boda se celebrará el 19 de Octubre de 2024 a las 13:00 horas en la Real Basílica de Nuestra Señora de Atocha",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(baseUrl[env.DOPPLER_CONFIG]),
  openGraph: {
    url: "/",
    description:
      "Nuestra boda se celebrará el 19 de Octubre de 2024 a las 13:00 horas en la Real Basílica de Nuestra Señora de Atocha",
    images: ["/logo_no_date.png"],
    siteName: "Boda de Blanca y Fernando",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEFAE0" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`font-sans ${poppins.className} min-h-svh bg-background`}
      >
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster position="top-center" richColors />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
