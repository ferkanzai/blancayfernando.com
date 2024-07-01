import RsvpCard from "@/app/components/cards/rsvp-card";
import FaqCard from "@/app/components/cards/faq-card";
import GiftCard from "@/app/components/cards/gift-card";

export default function MainCards() {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <RsvpCard />
      <FaqCard />
      <GiftCard />
    </div>
  );
}
