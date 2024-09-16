"use client";

import type { Row, Table } from "@tanstack/react-table";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SheetsConfig } from "@/app/components/admin-table/sheets-config";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { type FormularySelect } from "@/server/db/schema";
import { api } from "@/trpc/react";

type Props<TData> = {
  table: Table<TData>;
};

export function TableButtons<TData extends FormularySelect>({
  table,
}: Props<TData>) {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate: deleteRows } = api.rsvp.deleteFormularyData.useMutation({
    onSettled: async () => {
      await utils.rsvp.invalidate();
      router.refresh();
    },
    onSuccess: (data) => {
      toast.success(
        `${data} fila${data !== 1 ? "s" : ""} eliminada${
          data !== 1 ? "s" : ""
        } correctamente`,
      );
    },
  });
  const { mutate: updateSheet, isLoading: isUpdatingSheet } =
    api.spreadsheet.addDataToSheet.useMutation({
      onSettled: () => utils.spreadsheet.getSheet.invalidate(),
      onSuccess: () => toast.success("Datos actualizados correctamente"),
      onError: (err) => {
        if (err.data?.code === "BAD_REQUEST") {
          return toast.info("No hay datos nuevos para actualizar");
        }

        toast.error(err.message);
      },
    });
  const { data: sheetConfiguration } =
    api.spreadsheet.getSheetConfiguration.useQuery();

  const selectedRows = table.getFilteredSelectedRowModel().flatRows;
  const totalRows =
    selectedRows.length || table.getExpandedRowModel().flatRows?.length;

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    filename: `listaInvitados-${new Date().getFullYear()}-${(
      new Date().getMonth() + 1
    )
      .toString()
      .padStart(
        2,
        "0",
      )}-${new Date().getDate()}-${new Date().getHours().toString().padStart(2, "0")}${new Date().getMinutes().toString().padStart(2, "0")}${new Date().getSeconds().toString().padStart(2, "0")}`,
    columnHeaders: [
      {
        key: "id",
        displayLabel: "ID",
      },
      {
        key: "name",
        displayLabel: "Nombre",
      },
      {
        key: "coming",
        displayLabel: "Asistencia",
      },
      {
        key: "allergies",
        displayLabel: "Alergias",
      },
      {
        key: "specialMenu",
        displayLabel: "Menú especial",
      },
      {
        key: "specialMenuValue",
        displayLabel: "Valor del menú especial",
      },
    ],
  });

  const formatRow = ({ original }: Row<TData>) => {
    return {
      id: original.id,
      coming: original.coming ? "✅" : "❌",
      allergies: original.allergies ?? "",
      name: original.name ?? "",
      specialMenu: original.specialMenu ? "✅" : "❌",
      specialMenuValue: original.specialMenuValue ?? "",
    };
  };

  const handleExportData = () => {
    const rows = selectedRows.length
      ? selectedRows
      : table.getExpandedRowModel().flatRows;
    const data = rows.map(formatRow);

    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
    table.resetRowSelection();
  };

  const saveToSheet = () => {
    const rows = table.getExpandedRowModel().flatRows.map(formatRow);

    updateSheet(rows);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 py-4 lg:flex-row">
      <div className="flex flex-col gap-2 lg:flex-row">
        <Button className="tabular-nums" onClick={handleExportData} size="sm">
          Descargar CSV ({totalRows} fila{totalRows !== 1 ? "s" : ""})
        </Button>
        <div className="flex items-center gap-1">
          <Button
            className="tabular-nums"
            disabled={isUpdatingSheet || !sheetConfiguration?.value}
            onClick={saveToSheet}
            size="sm"
          >
            Actualizar datos en Spreadsheet
          </Button>
          <SheetsConfig />
        </div>
        <Button
          disabled={selectedRows.length === 0}
          onClick={() => {
            const selectedRowsIds = table
              .getFilteredSelectedRowModel()
              .flatRows.map(
                ({ original }) => original.id,
              ) as unknown as number[];

            deleteRows(selectedRowsIds);
            table.resetRowSelection();
          }}
          size="sm"
          variant="destructive"
        >
          Eliminar filas
        </Button>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex w-[304px] gap-2">
          <Button
            className="flex-1"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            Anterior
          </Button>
          <Button
            className="flex-1"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="sm"
            variant="outline"
          >
            Siguiente
          </Button>
        </div>
        <div className="flex w-[304px] gap-2">
          <Button
            className="flex-1"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.firstPage()}
            size="sm"
            variant="outline"
          >
            Primera página
          </Button>
          <Button
            className="flex-1"
            disabled={!table.getCanNextPage()}
            onClick={() => table.lastPage()}
            size="sm"
            variant="outline"
          >
            Última página
          </Button>
        </div>
        <Select onValueChange={(e) => table.setPageSize(Number(e))}>
          <SelectTrigger className="outline-none ring-0 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Mostrar 30 filas" defaultValue={30} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Mostrar {pageSize} filas
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
