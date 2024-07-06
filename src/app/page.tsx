import { ImageCarousel } from "@/app/components/image-carousel";
// import { MapWrapper } from "@/app/components/map";
import MainCards from "@/app/components/main-cards";

export default async function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-2 px-4 text-center md:px-10">
      <ImageCarousel />
      <h1 className="py-8 font-maginia text-4xl font-bold text-[#93987C]">
        19 Octubre 2024
      </h1>
      <MainCards />
      {/* <MapWrapper /> */}
    </main>
  );
}
