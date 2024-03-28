import { Gem, PartyPopper } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";

export default function RsvpCard() {
  return (
    <Link href="/rsvp">
      <Card className="group w-full max-w-[450px] cursor-pointer bg-transparent hover:-translate-y-2 hover:shadow-md hover:shadow-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <PartyPopper className="h-12 w-12 sm:h-8 sm:w-8 sm:group-hover:stroke-secondary" />
            <span className="sm:group-hover:text-secondary">
              ¡Confirma tu asistencia!
            </span>
            <Gem className="h-12 w-12 sm:h-8 sm:w-8 sm:group-hover:stroke-secondary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Ayúdanos a planificar mejor diciéndonos si vienes o no.</p>
          <p className="text-lg">¡Te esperamos!</p>
        </CardContent>
      </Card>
    </Link>
  );
}
