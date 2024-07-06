import { PartyPopper } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function RsvpCard() {
  return (
    <Link href="/rsvp">
      <Card className="group w-full max-w-[430px] cursor-pointer bg-transparent hover:-translate-y-2 hover:shadow-md hover:shadow-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4">
            <span className="sm:group-hover:text-secondary">
              ¡Confirma tu asistencia!
            </span>
            <PartyPopper className="h-8 min-h-8 w-8 min-w-8 sm:group-hover:stroke-secondary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Ayúdanos a planificar mejor diciéndonos si vienes o no</p>
        </CardContent>
      </Card>
    </Link>
  );
}
