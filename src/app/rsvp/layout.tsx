export const metadata = {
  title: "Boda de Blanca y Fernando - RSVP",
  description: "Dinos si vienes a la boda desde esta página. ¡Gracias!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
