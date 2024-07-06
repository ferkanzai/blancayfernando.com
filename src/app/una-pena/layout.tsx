export const metadata = {
  title: "Boda de Blanca y Fernando - Una Pena",
  description:
    "Una pena no poder contar contigo en este día, si cambias de opinión, ¡no dudes en decírnoslo!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: "/gracias",
    description:
      "Una pena no poder contar contigo en este día, si cambias de opinión, ¡no dudes en decírnoslo!",
    images: ["/logo_no_date.png"],
  },
};

export default function sadLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-8 px-4 text-center md:px-10">
      {children}
    </main>
  );
}
