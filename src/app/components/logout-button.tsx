"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      className="h-5 w-full"
      onClick={() => signOut({ callbackUrl: "/" })}
      size="sm"
      variant="link"
    >
      Cerrar sesión
    </Button>
  );
}
