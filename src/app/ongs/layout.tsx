export const metadata = {
  title: "Boda de Blanca y Fernando - ONGs",
  description:
    "Si quieres seguir ayudando a las ONGs que hemos elegido, ¡aquí tienes como! ¡Gracias!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/ongs",
    description:
      "Si quieres seguir ayudando a las ONGs que hemos elegido, ¡aquí tienes como! ¡Gracias!",
    images: ["/logo_no_date.png"],
    siteName: "Boda de Blanca y Fernando",
  },
};

export default function ongsLayout({
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
