import InfoData from "@/app/components/info-data";
import RsvpCard from "../components/cards/rsvp-card";

export default function ThanksPage() {
  return (
    <>
      <h1 className="font-maginia text-3xl font-bold text-primary">
        Una pena no poder contar contigo en este día.
      </h1>
      <h2 className="text-xl font-bold text-primary">
        Si cambias de opinión, ¡no dudes en decírnoslo!
      </h2>
      <RsvpCard />
      <p>
        Aquí puedes encontrar más información sobre la celebración y el convite:
      </p>
      <InfoData />
    </>
  );
}
