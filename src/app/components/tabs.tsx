import { Suspense } from "react";

import { columns } from "@/app/components/admin-table/columns";
import { DataTable } from "@/app/components/admin-table/data-table";
import MusicSuggestions from "@/app/components/music-suggestions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  type FormularySelect,
  type FormularySelectAll,
} from "@/server/db/schema";

const TabsComponent = ({
  data,
}: {
  data: {
    withAssociated: FormularySelect[];
    all: FormularySelectAll;
  };
}) => {
  return (
    <Tabs
      defaultValue="rsvp"
      className="flex w-full flex-col items-center justify-center gap-4"
    >
      <TabsList>
        <TabsTrigger value="rsvp">Invitados</TabsTrigger>
        <TabsTrigger value="music">Música sugerida</TabsTrigger>
      </TabsList>
      <TabsContent value="rsvp" asChild>
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data?.withAssociated} />
        </Suspense>
      </TabsContent>
      <TabsContent value="music" asChild>
        <Suspense fallback={<div>Loading...</div>}>
          <MusicSuggestions />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
