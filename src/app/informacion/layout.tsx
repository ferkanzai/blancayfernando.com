export const metadata = {
  title: "Boda de Blanca y Fernando - ¡Información!",
  description:
    "Nuestra boda se celebrará el 19 de Octubre de 2024 a las 13:00 horas en la Real Basílica de Nuestra Señora de Atocha",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/informacion",
    description:
      "Nuestra boda se celebrará el 19 de Octubre de 2024 a las 13:00 horas en la Real Basílica de Nuestra Señora de Atocha",
    images: ["/logo_no_date.png"],
    siteName: "Boda de Blanca y Fernando",
  },
};

export default function faqLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-8 px-4 text-center md:px-10">
      {children}
    </main>
  );
}
