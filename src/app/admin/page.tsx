import { redirect } from "next/navigation";

import Admin from "@/app/components/admin";
import { getServerAuthSession } from "@/server/auth";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <Admin />;
}
