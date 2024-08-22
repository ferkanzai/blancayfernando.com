export const metadata = {
  title: "Boda de Blanca y Fernando - Música",
  description:
    "¡Ayúdanos a hacer el día de nuestra boda más especial sugiriendo alguna canción! ¡Gracias!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/musica",
    description:
      "¡Ayúdanos a hacer el día de nuestra boda más especial sugiriendo alguna canción! ¡Gracias!",
    images: ["/logo_no_date.png"],
    siteName: "Boda de Blanca y Fernando",
  },
};

export default function rsvpLayout({
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
