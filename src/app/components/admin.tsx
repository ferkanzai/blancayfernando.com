"use client";

import { columns } from "@/app/components/admin-table/columns";
import { DataTable } from "@/app/components/admin-table/data-table";
import Stats from "@/app/components/stats";
import { api } from "@/trpc/react";
import { LogoutButton } from "@/app/components/logout-button";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/app/components/ui/tabs";

export default function Admin() {
  const { data, isFetching, isLoading, isRefetching } =
    api.rsvp.getData.useQuery();

  const loading = isFetching || isLoading || isRefetching;

  const going = data?.all?.filter((row) => row.coming).length ?? 0;
  const count = data?.all?.length ?? 0;
  const specialMenus = data?.all?.filter((row) => row.specialMenu).length ?? 0;

  const stats = {
    count,
    going,
    notGoing: count - going,
    specialMenus,
  };

  return (
    <>
      <LogoutButton />
      <Stats stats={stats} isLoading={loading} />
      <Tabs defaultValue="rsvp" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="rsvp">Invitados</TabsTrigger>
          <TabsTrigger value="music">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="rsvp">
          <h2 className="text-center text-3xl font-bold">📗 Lista completa</h2>
          <DataTable
            columns={columns}
            data={data?.withAssociated}
            isLoading={loading}
          />
        </TabsContent>
        <TabsContent value="music">Change your password here.</TabsContent>
      </Tabs>
      {/* <h2 className="text-center text-3xl font-bold">📗 Lista completa</h2>
      <DataTable
        columns={columns}
        data={data?.withAssociated}
        isLoading={loading}
      /> */}
    </>
  );
}
