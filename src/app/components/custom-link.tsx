import Link from "next/link";

import { cn } from "@/lib/utils";

export function CustomLink({ href, children, className }: CustomLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "underline decoration-primary underline-offset-4",
        className,
      )}
    >
      {children}
    </Link>
  );
}

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
