import { redirect } from "next/navigation";

import Admin from "@/app/components/admin";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const userProvider = await api.validEmails.checkProvider.query({
    userId: session.user.id,
  });

  if (!userProvider || userProvider?.provider === "spotify") {
    redirect("/");
  }

  return <Admin />;
}
