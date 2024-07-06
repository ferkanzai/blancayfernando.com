import FaqCard from "@/app/components/cards/faq-card";
import GiftCard from "@/app/components/cards/gift-card";
import MusicCard from "@/app/components/cards/music-card";
import RsvpCard from "@/app/components/cards/rsvp-card";

export default function MainCards() {
  return (
    <div className="flex flex-col gap-5 pb-16 md:max-w-5xl md:flex-row md:flex-wrap md:items-stretch md:justify-center">
      <RsvpCard />
      <FaqCard />
      <GiftCard />
      <MusicCard />
    </div>
  );
}
