import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Boda de Blanca y Fernando - Admin",
  description:
    "Página de administración, para controlar las estadísticas y la lista de invitados",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-2 pb-8 pt-0 md:px-8">
      {children}
    </div>
  );
}
