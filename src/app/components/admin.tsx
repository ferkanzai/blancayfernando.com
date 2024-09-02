import { Suspense } from "react";

import { LogoutButton } from "@/app/components/logout-button";
import Stats from "@/app/components/stats";
import { api } from "@/trpc/server";
import TabsComponent from "./tabs";

export default async function Admin() {
  const data = await api.rsvp.getData.query();

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
      <Suspense fallback={<div>Loading...</div>}>
        <Stats stats={stats} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TabsComponent data={data} />
      </Suspense>
    </>
  );
}
