export const metadata = {
  title: "Boda de Blanca y Fernando - RSVP",
  description:
    "Confírmanos si vienes a nuestra boda desde esta página. ¡Gracias!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/rsvp",
    description:
      "Confírmanos si vienes a nuestra boda desde esta página. ¡Gracias!",
    images: ["/logo_no_date.png"],
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
