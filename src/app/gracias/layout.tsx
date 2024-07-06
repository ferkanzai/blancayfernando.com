export const metadata = {
  title: "Boda de Blanca y Fernando - ¡Gracias!",
  description:
    "Gracias por ayuda a hacer de nuestra boda un día inolvidable. ¡Nos vemos pronto!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/gracias",
    description:
      "Gracias por ayuda a hacer de nuestra boda un día inolvidable. ¡Nos vemos pronto!",
    images: ["/logo_no_date.png"],
  },
};

export default function thanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-8 px-4 text-center md:px-10">
      {children}
    </main>
  );
}
