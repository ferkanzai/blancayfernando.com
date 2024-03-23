import Image from "next/image";
import Link from "next/link";

import NavLink from "@/app/components/nav-link";

export default async function Header() {
  return (
    <header className="flex w-full items-center justify-between gap-10 px-3 py-3 sm:py-5 md:px-10">
      <Link href="/">
        <Image src="/logo_no_date.png" width={60} height={60} alt="logo" />
      </Link>
      <div className="flex items-center gap-10">
        <NavLink href="/rsvp">Confirma tu asistencia</NavLink>
        {/* {session ? (
          <NavLink href="/api/auth/signout">Cerrar sesión</NavLink>
        ) : null} */}
      </div>
    </header>
  );
}
