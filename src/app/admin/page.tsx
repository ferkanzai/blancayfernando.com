import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <>{session.user.email}</>;
}
