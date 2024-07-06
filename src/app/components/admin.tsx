"use client";

import { columns } from "@/app/components/admin-table/columns";
import { DataTable } from "@/app/components/admin-table/data-table";
import Stats from "@/app/components/stats";
import { api } from "@/trpc/react";

export default function Admin() {
  const { data, isFetching, isLoading, isRefetching } =
    api.rsvp.getData.useQuery();

  const loading = isFetching || isLoading || isRefetching;

  const going = data?.all?.filter((row) => row.coming).length ?? 0;
  const count = data?.all?.length ?? 0;

  const stats = {
    count,
    going,
    notGoing: count - going,
  };

  return (
    <>
      <Stats stats={stats} isLoading={loading} />
      <h2 className="text-center text-3xl font-bold">📗 Lista completa</h2>
      <DataTable
        columns={columns}
        data={data?.withAssociated}
        isLoading={loading}
      />
    </>
  );
}
