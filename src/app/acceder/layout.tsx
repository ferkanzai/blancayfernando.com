import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Boda de Blanca y Fernando - Sign in",
  description: "Página para acceder al panel de administración",
};

export default function SignInLayout({
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
