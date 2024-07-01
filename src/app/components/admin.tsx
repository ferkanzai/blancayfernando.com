"use client";

import { api } from "@/trpc/react";
import Stats from "./stats";

export default function Admin() {
  const { data, isFetching, isLoading, isRefetching } =
    api.rsvp.getData.useQuery();

  const loading = isFetching || isLoading || isRefetching;

  const going = data?.filter((row) => row.coming).length ?? 0;
  const count = data?.length ?? 0;

  const stats = {
    count,
    going,
    notGoing: count - going,
  };

  return (
    <>
      <Stats stats={stats} isLoading={loading} />
      <h2 className="text-center text-3xl font-bold">📗 Lista completa</h2>
      {data?.map((row) => {
        return (
          <div className="flex gap-4" key={row.id}>
            <p>{row.id}</p>
            <p>{row.name}</p>
            <p>{row.associatedTo}</p>
            <p>{row.allergies}</p>
          </div>
        );
      })}
    </>
  );
}
