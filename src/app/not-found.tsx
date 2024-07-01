import GiftCard from "@/app/components/cards/gift-card";
import RsvpCard from "@/app/components/cards/rsvp-card";

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-8 px-4 text-center md:px-10">
      <h1 className="font-maginia text-3xl">
        Lo sentimos, pero esta página no existe
      </h1>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl">Quizá querrías...</h2>
        <RsvpCard />
        <GiftCard />
      </div>
    </main>
  );
}
