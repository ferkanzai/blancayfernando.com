"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, MoreHorizontal } from "lucide-react";

import { DeleteRowButton } from "@/app/components/admin-table/delete-row-button";
import { EditRowButton } from "@/app/components/admin-table/edit-row-button";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { type FormularySelect } from "@/server/db/schema";
import { useState } from "react";

// const columnHelper = createColumnHelper<FormularySelect>();

export const columns: ColumnDef<FormularySelect>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Seleccionar todas las filas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column, table }) => {
      return (
        <div className="flex items-center gap-2">
          <button
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
            }}
          >
            {table.getIsAllRowsExpanded() ? (
              <ChevronDownIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </button>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre y apellidos
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row, getValue }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <div className="flex items-center gap-2">
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </button>
          ) : null}{" "}
          {getValue<boolean>()}
        </div>
      </div>
    ),
    minSize: 200,
  },
  {
    accessorKey: "coming",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asistencia
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (row.getValue("coming") ? "✅" : "❌"),
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "allergies",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alergias
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "specialMenu",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Necesita menú especial
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (row.getValue("specialMenu") ? "✅" : "❌"),
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "specialMenuValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Menú especial
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const { id } = row.original;

      return (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <DropdownMenuItem asChild className="w-full">
                <AlertDialogTrigger className="flex cursor-pointer justify-start gap-2">
                  <EditIcon className="h-4 w-4" />
                  Editar fila
                </AlertDialogTrigger>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="p-0">
                <DeleteRowButton id={id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditRowButton row={row} setOpen={setOpen} />
        </AlertDialog>
      );
    },
  },
];
