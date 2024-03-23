import "@/styles/globals.css";

import type { Viewport } from "next";
import { Poppins } from "next/font/google";

import Header from "@/app/components/header";
import { TRPCReactProvider } from "@/trpc/react";

const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
});

export const metadata = {
  title: "Boda de Blanca y Fernando",
  description:
    "Bienvenidos a nuestra boda que se celebrará el 19 de Octubre de 2024",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        className={`font-sans ${poppins.className} bg-background min-h-svh`}
      >
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
