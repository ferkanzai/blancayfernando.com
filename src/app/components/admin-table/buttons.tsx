"use client";

import type { Row, Table } from "@tanstack/react-table";
// import { download, generateCsv, mkConfig } from "export-to-csv";
import { toast } from "sonner";

import { FormularySelect } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";

type Props<TData> = {
  table: Table<TData>;
};

export function TableButtons<TData extends FormularySelect>({
  table,
}: Props<TData>) {
  const utils = api.useUtils();
  // const { mutate: deleteRows } = api.formulary.deleteFormularyData.useMutation({
  //   onSettled: () => utils.formulary.invalidate(),
  //   onSuccess: (data) => {
  //     toast.success(
  //       `${data} fila${data !== 1 ? "s" : ""} eliminada${
  //         data !== 1 ? "s" : ""
  //       } correctamente`,
  //     );
  //   },
  // });
  // const { mutate: updateSheet, isLoading: isUpdatingSheet } =
  //   api.spreadsheet.addDataToSheet.useMutation({
  //     onSettled: () => utils.spreadsheet.getSheet.invalidate(),
  //     onSuccess: () => toast.success("Datos actualizados correctamente"),
  //     onError: (err) => {
  //       if (err.data?.code === "BAD_REQUEST") {
  //         return toast.info("No hay datos nuevos para actualizar");
  //       }

  //       toast.error(err.message);
  //     },
  //   });
  // const { data: sheetConfiguration } =
  //   api.spreadsheet.getSheetConfiguration.useQuery();

  const selectedRows = table.getFilteredSelectedRowModel().flatRows;
  const totalRows = selectedRows.length || table.getCoreRowModel().rows?.length;

  // const csvConfig = mkConfig({
  //   fieldSeparator: ",",
  //   decimalSeparator: ".",
  //   filename: `listaInvitados-${new Date().getFullYear()}-${(
  //     new Date().getMonth() + 1
  //   )
  //     .toString()
  //     .padStart(2, "0")}-${new Date().getDate()}`,
  //   columnHeaders: [
  //     {
  //       key: "name",
  //       displayLabel: "Nombre",
  //     },
  //     {
  //       key: "busGoing",
  //       displayLabel: "Bus ida",
  //     },
  //     {
  //       key: "busGoingDirection",
  //       displayLabel: "Dirección bus ida",
  //     },
  //     {
  //       key: "busReturn",
  //       displayLabel: "Bus vuelta",
  //     },
  //     {
  //       key: "busReturnTime",
  //       displayLabel: "Hora bus vuelta",
  //     },
  //     {
  //       key: "busReturnDirection",
  //       displayLabel: "Dirección bus vuelta",
  //     },
  //     {
  //       key: "menu",
  //       displayLabel: "Menú",
  //     },
  //     {
  //       key: "allergies",
  //       displayLabel: "Alergias",
  //     },
  //   ],
  // });

  // const formatRow = ({ original }: Row<TData>) => {
  //   return {
  //     id: original.id,
  //     busGoing: original.going ? "✅" : "❌",
  //     busReturn: original.busReturn ? "✅" : "❌",
  //     busGoingDirection: returnText(original.busGoingDirection, true),
  //     busReturnDirection: returnText(original.busReturnDirection),
  //     busReturnTime: returnText(original.busReturnTime),
  //     menu: `${menuIcon[original.menu]} ${original.menu}`,
  //     allergies: original.allergies ?? "",
  //     name: original.name ?? "",
  //   };
  // };

  // const handleExportData = () => {
  //   const rows = selectedRows.length
  //     ? selectedRows
  //     : table.getCoreRowModel().rows;
  //   const data = rows.map(formatRow);

  //   const csv = generateCsv(csvConfig)(data);
  //   download(csvConfig)(csv);
  // };

  // const saveToSheet = () => {
  //   const rows = table.getCoreRowModel().rows.map(formatRow);

  //   updateSheet(rows);
  // };

  return (
    <div className="flex flex-col items-center justify-between gap-2 space-x-2 py-4 sm:flex-row sm:gap-0">
      {/* <div className="flex flex-col gap-2 md:flex-row">
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
          }}
          size="sm"
          variant="destructive"
        >
          Eliminar filas
        </Button>
      </div> */}
      <div className="flex gap-2">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          variant="outline"
        >
          Anterior
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="outline"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
