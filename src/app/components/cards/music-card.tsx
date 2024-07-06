import { Guitar, MicVocal } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function MusicCard() {
  return (
    <Link href="/musica">
      <Card className="group w-full max-w-[430px] cursor-pointer bg-transparent hover:-translate-y-2 hover:shadow-md hover:shadow-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-evenly gap-2">
            <MicVocal className="h-8 min-h-8 w-8 min-w-8 sm:group-hover:stroke-secondary" />
            <span className="sm:group-hover:text-secondary">¡Música!</span>
            <Guitar className="h-8 min-h-8 w-8 min-w-8 sm:group-hover:stroke-secondary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>¡Por si quieres que suene algo especial en este día!</p>
        </CardContent>
      </Card>
    </Link>
  );
}
