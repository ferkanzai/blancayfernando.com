import "@/styles/globals.css";

import type { Viewport } from "next";
import { Poppins } from "next/font/google";

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
  themeColor: "#FEFAE0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`font-sans ${poppins.className}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
