"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

export function DeleteRowButton({ id }: { id: number }) {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate } = api.rsvp.deleteFormularyData.useMutation({
    onSuccess: (data) => {
      toast.success(
        `${data} fila${data !== 1 ? "s" : ""} eliminada${
          data !== 1 ? "s" : ""
        } correctamente`,
      );
    },
    onSettled: async () => {
      await utils.rsvp.invalidate();
      router.refresh();
    },
  });

  return (
    <Button
      variant="destructive"
      onClick={() => mutate([id])}
      className="flex items-center justify-start"
    >
      <TrashIcon className="h-4 w-4" />
      Elminar fila
    </Button>
  );
}
