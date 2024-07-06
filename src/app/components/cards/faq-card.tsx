import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function FaqCard() {
  return (
    <Link href="/informacion">
      <Card className="group w-full max-w-[430px] cursor-pointer bg-transparent hover:-translate-y-2 hover:shadow-md hover:shadow-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-evenly gap-2">
            <span className="sm:group-hover:text-secondary">
              ¿Tienes alguna duda?
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            ¡Aquí podrás encontrar toda la información necesaria y resolverlas!
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
