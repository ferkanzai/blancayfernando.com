import { columns } from "@/app/components/admin-table/columns";
import { DataTable } from "@/app/components/admin-table/data-table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { FormularySelect, FormularySelectAll } from "@/server/db/schema";
import MusicSuggestions from "@/app/components/music-suggestions";

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
      className="flex flex-col items-center justify-center gap-4"
    >
      <TabsList>
        <TabsTrigger value="rsvp">Invitados</TabsTrigger>
        <TabsTrigger value="music">Música sugerida</TabsTrigger>
      </TabsList>
      <TabsContent value="rsvp">
        <h2 className="text-center text-3xl font-bold">📗 Lista completa</h2>
        <DataTable columns={columns} data={data?.withAssociated} />
      </TabsContent>
      <TabsContent value="music">
        <MusicSuggestions />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
