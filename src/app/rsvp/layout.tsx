export default function rsvpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-2 px-4 text-center md:px-10">
      {children}
    </main>
  );
}
