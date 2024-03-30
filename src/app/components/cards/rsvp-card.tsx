import { PartyPopper } from "lucide-react";

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
          <CardTitle className="flex items-center justify-evenly gap-2">
            <span className="sm:group-hover:text-secondary">
              ¡Confirma tu asistencia!
            </span>
            <PartyPopper className="h-8 min-h-8 w-8 min-w-8 sm:group-hover:stroke-secondary" />
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
