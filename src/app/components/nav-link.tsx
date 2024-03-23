"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";

export default function NavLink({
  children,
  href,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        `
          text-center
          transition
          hover:font-bold
          hover:underline
          hover:underline-offset-4
          md:hover:scale-105
        `,
        isActive
          ? `
              font-bold
              underline
              underline-offset-4
            `
          : null,
        className,
      )}
    >
      {children}
    </Link>
  );
}

export type NavLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};
