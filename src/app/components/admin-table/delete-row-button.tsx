"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { Button } from "@/app/components/ui/button";

export function DeleteRowButton({ id }: { id: number }) {
  const utils = api.useUtils();

  const { mutate } = api.rsvp.deleteFormularyData.useMutation({
    onSuccess: (data) => {
      toast.success(
        `${data} fila${data !== 1 ? "s" : ""} eliminada${
          data !== 1 ? "s" : ""
        } correctamente`,
      );
    },
    onSettled: () => utils.rsvp.invalidate(),
  });

  return (
    <Button
      variant="ghost"
      onClick={() => mutate([id])}
      className="flex items-center justify-start gap-1 p-1"
    >
      <TrashIcon className="h-5 w-5" />
      Elminar fila
    </Button>
  );
}
