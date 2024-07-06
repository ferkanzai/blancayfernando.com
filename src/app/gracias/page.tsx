import InfoData from "@/app/components/info-data";

export default function ThanksPage() {
  return (
    <>
      <h1 className="font-maginia text-3xl font-bold text-primary">
        ¡Gracias por celebrar este día tan importante con nosotros!
      </h1>
      <h2 className="text-xl font-bold text-primary">
        ¡Estamos muy contentos de que puedas venir a nuestra boda!
      </h2>
      <p>
        Aquí puedes encontrar más información sobre la celebración y el convite:
      </p>
      <InfoData />
    </>
  );
}
