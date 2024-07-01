"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import { type FormularySelect } from "@/server/db/schema";
import { Button } from "../ui/button";
import { ArrowDownUpIcon } from "lucide-react";

const columnHelper = createColumnHelper<FormularySelect>();

export const columns: ColumnDef<FormularySelect> = [
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre y apellidos
          <ArrowDownUpIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    minSize: 200,
  }),
];
