"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";

export default function NavLink({
  children,
  href,
  title,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={title}
      className={cn(
        `
          text-center
          antialiased
          transition
          hover:scale-105
          hover:underline
          hover:underline-offset-4
          hover:[text-shadow:_0_0_1px_black]
        `,
        isActive
          ? `
              underline
              underline-offset-4
              hover:scale-100
              hover:[text-shadow:none]
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
  title: string;
};
