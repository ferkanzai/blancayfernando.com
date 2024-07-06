import { redirect } from "next/navigation";

import { SignInForm } from "@/app/components/sign-in-form";
import { getServerAuthSession } from "@/server/auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();

  const { error = null } = searchParams;

  if (session) {
    return redirect("/admin");
  }

  return (
    <>
      <h1 className="text-xl sm:text-2xl">Acceder como admin</h1>
      <SignInForm error={error as string} />
    </>
  );
}
