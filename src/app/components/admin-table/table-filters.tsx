"use client";

import { type useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export function TableFilters<TData>({ table }: Props<TData>) {
  const [pointerDown, setPointerDown] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2 py-4 md:flex-row">
      <Input
        placeholder="Filtrar por nombre..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-xs text-base"
      />
      <Input
        placeholder="Filtrar por alergias..."
        value={(table.getColumn("allergies")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("allergies")?.setFilterValue(event.target.value)
        }
        className="max-w-xs text-base"
      />
      <div className="flex gap-2">
        <Button
          className="max-w-xs"
          onClick={() => {
            if (pointerDown) {
              table.resetColumnFilters();
              setPointerDown(false);
            }
          }}
          onPointerDown={() => setPointerDown(true)}
          variant="default"
        >
          Limpiar filtros
        </Button>
        <Button
          className="max-w-xs"
          onClick={() => {
            if (pointerDown) {
              table.resetColumnFilters();
              table.resetSorting();
              table.resetExpanded();
              setPointerDown(false);
            }
          }}
          onPointerDown={() => setPointerDown(true)}
          variant="destructive"
        >
          Resetear tabla
        </Button>
      </div>
    </div>
  );
}

type Props<TData> = {
  table: ReturnType<typeof useReactTable<TData>>;
};
