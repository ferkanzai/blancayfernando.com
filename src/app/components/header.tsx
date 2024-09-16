import Image from "next/image";
import Link from "next/link";

import NavLink from "@/app/components/nav-link";
import { getServerAuthSession } from "@/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="flex w-full items-center justify-between gap-10 px-3 py-3 sm:py-5 md:px-10">
      <Link href="/" title="Volver al inicio">
        <Image
          src="/logo_no_date.png"
          width={60}
          height={60}
          alt="logo"
          className="h-auto w-auto cursor-pointer"
          title="Volver al inicio"
        />
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <NavLink href="/admin" title="Panel de administración">
            Admin
          </NavLink>
        ) : null}
        <NavLink href="/rsvp" title="Página de confirmación de asistencia">
          Confirma tu asistencia
        </NavLink>
      </div>
    </header>
  );
}
