export const metadata = {
  title: "Boda de Blanca y Fernando - ¡Información!",
  description:
    "Gracias por ayuda a hacer de nuestra boda un día inolvidable. ¡Nos vemos pronto!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/informacion",
    description:
      "Gracias por ayuda a hacer de nuestra boda un día inolvidable. ¡Nos vemos pronto!",
    images: ["/logo_no_date.png"],
  },
};

export default function faqLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-8 px-4 text-center md:px-10">
      {children}
    </main>
  );
}
